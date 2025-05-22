// ==============================
// IMPORTACIONES
// ==============================
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notificaciones.css';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { FaEnvelope, FaTimes } from "react-icons/fa";

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
/**
 * NotificacionesU muestra la lista de notificaciones del usuario y permite ver el detalle de cada una.
 */
const NotificacionesU = () => {
    // ------------------------------
    // ESTADOS
    // ------------------------------
    const [mensajes, setMensajes] = useState([]);
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
    const [error, setError] = useState(null);

    // ------------------------------
    // EFECTO: CARGA DE NOTIFICACIONES
    // ------------------------------
    useEffect(() => {
        const fetchMensajes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/notificaciones', {
                    withCredentials: true
                });
                setMensajes(response.data);
                setError(null);
            } catch {
                setError('Error al cargar las notificaciones. Por favor, intente nuevamente.');
            }
        };
        fetchMensajes();
    }, []);

    // ------------------------------
    // FUNCIONES AUXILIARES
    // ------------------------------
    // Formatea una fecha en formato YYYY-MM-DD
    const formatearFecha = (fecha) => fecha.split('T')[0];

    // Selecciona un mensaje para mostrar en detalle
    const handleMensajeClick = (mensaje) => setMensajeSeleccionado(mensaje);

    // ------------------------------
    // RENDERIZADO
    // ------------------------------
    return (
        <div className="container">
            <HeaderPl />

            {/* Mensaje de error */}
            {error && <div className="error-mensaje">{error}</div>}

            <div className="notificaciones-container">
                {/* Lista de notificaciones */}
                <div className="mensajes-lista">
                    {mensajes.map((mensaje) => (
                        <div
                            key={mensaje.id}
                            className={`mensaje-card ${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
                            onClick={() => handleMensajeClick(mensaje)}
                        >
                            <div className="mensaje-info">
                                <h3>{mensaje.titulo}</h3>
                                <span className="mensaje-fecha">{formatearFecha(mensaje.created_at)}</span>
                                <span className="mensaje-admin">{mensaje.nombre_admin}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detalle de la notificación seleccionada */}
                <div className="mensaje-detalle">
                    {mensajeSeleccionado ? (
                        <div className="detalle-frame">
                            <div className="detalle-titulo-frame">
                                <h1 className="detalle-titulo">{mensajeSeleccionado.titulo}</h1>
                                <span className="detalle-fecha">{formatearFecha(mensajeSeleccionado.created_at)}</span>
                                <h2 className="detalle-admin">{mensajeSeleccionado.nombre_admin}</h2>
                            </div>
                            <p className="detalle-contenido">{mensajeSeleccionado.contenido}</p>
                            <FaTimes className="cerrar-chat" onClick={() => setMensajeSeleccionado(null)} />
                        </div>
                    ) : (
                        <div className="mensaje-vacio-contenido">
                            <div className="mensaje-header"></div>
                            <div className="mensaje-vacio-body">
                                <FaEnvelope className="sobre-icono" />
                                <p>No se ha seleccionado ninguna conversación.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotificacionesU;

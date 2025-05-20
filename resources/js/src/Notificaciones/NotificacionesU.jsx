import React, { useEffect, useState } from 'react'; // Importa React y hooks necesarios
import axios from 'axios'; // Cliente HTTP para interactuar con la API
import './Notificaciones.css'; // Estilos CSS del componente
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx'; // Componente del encabezado
import Footer from '../components/Footer/Footer.jsx';
import {FaEnvelope, FaPlus, FaTimes} from "react-icons/fa"; // Componente del pie de página

const NotificacionesU = () => {
    // Estados para controlar las notificaciones y sus interacciones
    const [mensajes, setMensajes] = useState([]); // Lista de mensajes/notificaciones
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null); // Mensaje que se muestra en detalle
    const [error, setError] = useState(null); // Mensaje de error

    // Carga inicial de mensajes al montar el componente
    useEffect(() => {
        fetchMensajes();
    }, []);

    // Función para obtener mensajes desde la API
    const fetchMensajes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notificaciones', {
                withCredentials: true
            });
            setMensajes(response.data); // Guardamos los mensajes recibidos
            setError(null);
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            setError('Error al cargar las notificaciones. Por favor, intente nuevamente.');
        }
    };

    // Formatea una fecha en formato corto (YYYY-MM-DD)
    const formatearFecha = (fecha) => {
        return fecha.split('T')[0];
    };

    // Selecciona un mensaje para mostrar en detalle
    const handleMensajeClick = (mensaje) => {
        setMensajeSeleccionado(mensaje);
    };

    return (
        <div className="container">
            <HeaderPl /> {/* Encabezado de administrador */}

            {/* Muestra el error si existe */}
            {error && <div className="error-mensaje">{error}</div>}

            <div className="notificaciones-container">
                {/* Lista de mensajes */}
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

                {/* Vista detallada del mensaje */}
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
                            <div className="mensaje-header">
                            </div>
                            <div className="mensaje-vacio-body">
                                <FaEnvelope className="sobre-icono" />
                                <p>No se ha seleccionado ninguna conversación.</p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Formulario flotante para agregar notificación */}

            </div>

            <Footer /> {/* Pie de página */}
        </div>
    );
};

export default NotificacionesU;

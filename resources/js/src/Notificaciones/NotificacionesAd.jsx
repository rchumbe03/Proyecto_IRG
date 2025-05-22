// ==============================
// IMPORTACIONES
// ==============================
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaEnvelope, FaTimes } from 'react-icons/fa';
import './Notificaciones.css';
import HeaderAd from '../components/Headers/jsx/HeaderAd.jsx';
import Footer from '../components/Footer/Footer.jsx';

// ==============================
// CONFIGURACIÓN
// ==============================
const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
};

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
/**
 * NotificacionesAd permite a administradores gestionar notificaciones:
 * ver, agregar, editar y eliminar.
 */
const NotificacionesAd = () => {
    // ------------------------------
    // ESTADOS
    // ------------------------------
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [mensajes, setMensajes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState({ titulo: '', contenido: '' });
    const [editandoMensajeId, setEditandoMensajeId] = useState(null);
    const [mensajeEditado, setMensajeEditado] = useState({});
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
    const [error, setError] = useState(null);

    // ------------------------------
    // EFECTO: CARGA INICIAL
    // ------------------------------
    useEffect(() => {
        const inicializar = async () => {
            await getCsrfToken();
            await fetchMensajes();
        };
        inicializar();
    }, []);

    // ------------------------------
    // FUNCIONES AUXILIARES
    // ------------------------------
    // Obtiene el token CSRF
    const getCsrfToken = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        } catch {
            setError('Error de autenticación. Por favor, inicie sesión nuevamente.');
        }
    };

    // Obtiene las notificaciones
    const fetchMensajes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notificaciones', config);
            setMensajes(response.data);
            setError(null);
        } catch {
            setError('Error al cargar las notificaciones. Por favor, intente nuevamente.');
        }
    };

    // Formatea fecha a YYYY-MM-DD
    const formatearFecha = (fecha) => fecha.split('T')[0];

    // Selecciona un mensaje para detalle
    const handleMensajeClick = (mensaje) => setMensajeSeleccionado(mensaje);

    // ------------------------------
    // CRUD DE NOTIFICACIONES
    // ------------------------------
    // Agrega una nueva notificación
    const handleAgregarMensaje = async () => {
        if (nuevoMensaje.titulo.trim() && nuevoMensaje.contenido.trim()) {
            try {
                const datosNuevoMensaje = {
                    titulo: nuevoMensaje.titulo,
                    contenido: nuevoMensaje.contenido,
                    id_admin: userData.id
                };
                const response = await axios.post(
                    'http://localhost:8000/api/notificaciones',
                    datosNuevoMensaje,
                    config
                );
                if (response.data) {
                    setMensajes([response.data, ...mensajes]);
                    setNuevoMensaje({ titulo: '', contenido: '' });
                    setMostrarFormulario(false);
                    setError(null);
                }
            } catch {
                setError('Error al agregar la notificación. Por favor, intente nuevamente.');
            }
        } else {
            setError('Por favor, complete todos los campos requeridos.');
        }
    };

    // Inicia la edición de una notificación
    const handleEditarMensaje = (id, e) => {
        e.stopPropagation();
        const mensaje = mensajes.find((m) => m.id === id);
        if (mensaje) {
            setEditandoMensajeId(id);
            setMensajeEditado({
                titulo: mensaje.titulo,
                contenido: mensaje.contenido
            });
        }
    };

    // Guarda los cambios de edición
    const handleGuardarEdicion = async (id, e) => {
        e.stopPropagation();
        try {
            const datosActualizados = {
                titulo: mensajeEditado.titulo,
                contenido: mensajeEditado.contenido,
                id_admin: userData.id
            };
            const response = await axios.put(
                `http://localhost:8000/api/notificaciones/${id}`,
                datosActualizados,
                config
            );
            if (response.data) {
                setMensajes(mensajes.map((m) => m.id === id ? response.data : m));
                setEditandoMensajeId(null);
                setMensajeEditado({});
                setError(null);
            }
        } catch {
            setError('Error al actualizar la notificación. Por favor, intente nuevamente.');
        }
    };

    // Elimina una notificación
    const handleEliminarMensaje = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(
                `http://localhost:8000/api/notificaciones/${id}`,
                {
                    ...config,
                    data: { id_admin: userData.id }
                }
            );
            setMensajes(mensajes.filter((msg) => msg.id !== id));
            if (mensajeSeleccionado?.id === id) setMensajeSeleccionado(null);
            setError(null);
        } catch {
            setError('Error al eliminar la notificación. Por favor, intente nuevamente.');
        }
    };

    // ------------------------------
    // RENDERIZADO
    // ------------------------------
    return (
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <HeaderAd />

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
                                {/* Edición flotante */}
                                {editandoMensajeId === mensaje.id ? (
                                    <div className="edicion-flotante">
                                        <div className="edicion-header">
                                            <FaTimes
                                                className="cerrar-edicion"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditandoMensajeId(null);
                                                }}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Título"
                                            value={mensajeEditado.titulo || ''}
                                            onChange={(e) => setMensajeEditado({
                                                ...mensajeEditado,
                                                titulo: e.target.value
                                            })}
                                            className="edicion-titulo-input"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <textarea
                                            placeholder="Contenido"
                                            value={mensajeEditado.contenido || ''}
                                            onChange={(e) => setMensajeEditado({
                                                ...mensajeEditado,
                                                contenido: e.target.value
                                            })}
                                            className="edicion-contenido-input"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <button
                                            className="guardar-edicion-btn"
                                            onClick={(e) => handleGuardarEdicion(mensaje.id, e)}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mensaje-contenido">
                                        <p>{mensaje.contenido}</p>
                                        {/* Acciones: Editar y Eliminar */}
                                        <div className="mensaje-acciones">
                                            {mensaje.id_admin === userData.id && (
                                                <>
                                                    <FaEdit
                                                        className={`accion-icono ${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
                                                        onClick={(e) => handleEditarMensaje(mensaje.id, e)}
                                                    />
                                                    <FaTrash
                                                        className={`accion-icono ${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
                                                        onClick={(e) => handleEliminarMensaje(mensaje.id, e)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                            <div className="mensaje-header">
                                <div></div>
                                <button className="agregar-btn" onClick={() => setMostrarFormulario(true)}>
                                    Agregar <FaPlus style={{ marginLeft: '5px' }} />
                                </button>
                            </div>
                            <div className="mensaje-vacio-body">
                                <FaEnvelope className="sobre-icono" />
                                <p>No se ha seleccionado ninguna conversación.</p>
                            </div>
                        </div>
                    )}

                    {/* Botón para mostrar el formulario de nuevo mensaje */}
                    <button className="agregar-btn" onClick={() => setMostrarFormulario(true)}>
                        Agregar <FaPlus style={{ marginLeft: '5px' }} />
                    </button>
                </div>

                {/* Formulario flotante para agregar notificación */}
                {mostrarFormulario && (
                    <div className="formulario-flotante">
                        <h2>Nueva Notificación</h2>
                        <input
                            type="text"
                            placeholder="Título"
                            value={nuevoMensaje.titulo}
                            onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, titulo: e.target.value })}
                        />
                        <textarea
                            placeholder="Contenido"
                            value={nuevoMensaje.contenido}
                            onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, contenido: e.target.value })}
                        />
                        <div className="formulario-botones">
                            <button onClick={handleAgregarMensaje}>Agregar</button>
                            <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default NotificacionesAd;

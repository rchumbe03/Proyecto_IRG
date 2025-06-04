import React, { useEffect, useState } from 'react';
 import axios from 'axios';
 import { FaEdit, FaTrash, FaPlus, FaEnvelope, FaTimes } from 'react-icons/fa';
 import './Notificaciones.css';
 import Header from '../components/Headers/jsx/HeaderAd.jsx';
 import Footer from '../components/Footer/Footer.jsx';

const config = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
};

const NotificacionesAd = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [mensajes, setMensajes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState({ titulo: '', contenido: '' });
    const [editandoMensajeId, setEditandoMensajeId] = useState(null);
    const [mensajeEditado, setMensajeEditado] = useState({});
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const inicializar = async () => {
            await getCsrfToken();
            await fetchMensajes();
        };
        inicializar();
    }, []);

    const getCsrfToken = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
        } catch (error) {
            setError('Error de autenticación. Por favor, inicie sesión nuevamente.');
        }
    };

    const filtrarMensajes = (mensajes) => {
        return mensajes.filter(
            (mensaje) => mensaje.id_curso !== 2
        );
    };

    const fetchMensajes = async () => {
        try {
            const url = 'http://localhost:8000/api/notificaciones?course_id=1';
            const response = await axios.get(url, config);

            // Filtra los mensajes usando la función filtrarMensajes
            const mensajesFiltrados = filtrarMensajes(response.data);

            setMensajes(mensajesFiltrados);
            setError(null);
        } catch (error) {
            setError('Error al cargar las notificaciones. Por favor, intente nuevamente.');
        }
    };

    const formatearFecha = (fecha) => fecha.split('T')[0];

    const handleMensajeClick = (mensaje) => setMensajeSeleccionado(mensaje);

    const handleAgregarMensaje = async () => {
        if (nuevoMensaje.titulo.trim() && nuevoMensaje.contenido.trim()) {
            try {
                const datosNuevoMensaje = {
                    titulo: nuevoMensaje.titulo,
                    contenido: nuevoMensaje.contenido,
                    id_admin: userData.id,
                    course_id: 1 // Forzar curso 1
                };
                const response = await axios.post(
                    'http://localhost:8000/api/notificaciones',
                    datosNuevoMensaje,
                    config
                );
                if (response.data.course_id === 1) {
                    setMensajes([response.data, ...mensajes]);
                }
                setNuevoMensaje({ titulo: '', contenido: '' });
                setMostrarFormulario(false);
                setError(null);
            } catch (error) {
                setError('Error al agregar la notificación. Por favor, intente nuevamente.');
            }
        } else {
            setError('Por favor, complete todos los campos requeridos.');
        }
    };

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

    const handleGuardarEdicion = async (id, e) => {
        e.stopPropagation();
        try {
            const datosActualizados = {
                titulo: mensajeEditado.titulo,
                contenido: mensajeEditado.contenido,
                id_admin: userData.id,
                course_id: 1 // Forzar curso 1
            };
            const response = await axios.put(
                `http://localhost:8000/api/notificaciones/${id}`,
                datosActualizados,
                config
            );
            if (response.data.course_id === 1) {
                setMensajes(mensajes.map((m) => m.id === id ? response.data : m));
            } else {
                setMensajes(mensajes.filter((m) => m.id !== id));
            }
            setEditandoMensajeId(null);
            setMensajeEditado({});
            setError(null);
        } catch (error) {
            setError('Error al actualizar la notificación. Por favor, intente nuevamente.');
        }
    };

    const handleEliminarMensaje = async (id, titulo, e) => {
        e.stopPropagation();

        // Confirmación visual antes de eliminar
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar la notificación con título: "${titulo}"?`);

        if (!confirmacion) {
            return; // Si el usuario cancela, no se realiza la eliminación
        }

        try {
            await axios.delete(
                `http://localhost:8000/api/notificaciones/${id}`,
                {
                    ...config,
                    data: { id_admin: userData.id, titulo: titulo }
                }
            );
            setMensajes(mensajes.filter((msg) => msg.id !== id));
            if (mensajeSeleccionado?.id === id) setMensajeSeleccionado(null);
            setError(null);
        } catch (error) {
            setError('Error al eliminar la notificación. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="container">
            <Header />
            {error && <div className="error-mensaje">{error}</div>}
            <div className="notificaciones-container">
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
                                        <div className="mensaje-acciones">
                                            {mensaje.id_admin === userData.id && (
                                                <>
                                                    <FaEdit
                                                        className="accion-icono"
                                                        onClick={(e) => handleEditarMensaje(mensaje.id, e)}
                                                    />
                                                    <FaTrash
                                                        className="accion-icono"
                                                        onClick={(e) => handleEliminarMensaje(mensaje.id, mensaje.titulo, e)}
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
                    <button className="agregar-btn" onClick={() => setMostrarFormulario(true)}>
                        Agregar <FaPlus style={{ marginLeft: '5px' }} />
                    </button>
                </div>
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
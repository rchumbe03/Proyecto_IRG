import React, { useEffect, useState } from 'react'; // Importa React y hooks necesarios
import axios from 'axios'; // Cliente HTTP para interactuar con la API
import {FaEdit, FaTrash, FaPlus, FaEnvelope, FaTimes} from 'react-icons/fa'; // Iconos de edición, eliminación y agregar
import './Notificaciones.css'; // Estilos CSS del componente
import HeaderAd from '../Headers/jsx/HeaderAd.jsx'; // Componente del encabezado
import Footer from '../Footer.jsx'; // Componente del pie de página

const Notificaciones = () => {
    // Estados para controlar las notificaciones y sus interacciones
    const [mensajes, setMensajes] = useState([]); // Lista de mensajes/notificaciones
    const [mostrarFormulario, setMostrarFormulario] = useState(false); // Muestra/oculta el formulario de agregar
    const [nuevoMensaje, setNuevoMensaje] = useState({ titulo: '', contenido: '' }); // Datos del nuevo mensaje
    const [editandoMensajeId, setEditandoMensajeId] = useState(null); // ID del mensaje en edición
    const [mensajeEditado, setMensajeEditado] = useState({}); // Datos modificados de edición
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null); // Mensaje que se muestra en detalle
    const [error, setError] = useState(null); // Mensaje de error

    // Carga inicial de mensajes al montar el componente
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                    withCredentials: true
                });
            } catch (error) {
                console.error('Error al obtener el token CSRF:', error);
            }
        };

        getCsrfToken();
        fetchMensajes();
    }, []);

    // Función para obtener mensajes desde la API
    const fetchMensajes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notificaciones', {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setMensajes(response.data);
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

    // Agrega un nuevo mensaje
    const handleAgregarMensaje = async () => {
        if (nuevoMensaje.titulo.trim() && nuevoMensaje.contenido.trim()) {
            try {
                const datosNuevoMensaje = {
                    titulo: nuevoMensaje.titulo,
                    contenido: nuevoMensaje.contenido,
                    // La información del admin se manejará en el backend
                };

                const response = await axios.post(
                    'http://localhost:8000/api/notificaciones',
                    datosNuevoMensaje,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );

                if (response.data) {
                    setMensajes([response.data, ...mensajes]); // Agregar al principio de la lista
                    setNuevoMensaje({ titulo: '', contenido: '' });
                    setMostrarFormulario(false);
                    setError(null);
                }
            } catch (error) {
                console.error('Error al agregar notificación:', error);
                setError('Error al agregar la notificación. Por favor, intente nuevamente.');
            }
        } else {
            setError('Por favor, complete todos los campos requeridos.');
        }
    };

// Elimina un mensaje existente
    const handleEliminarMensaje = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://localhost:8000/api/notificaciones/${id}`, {
                withCredentials: true
            });

            // Filtra el mensaje eliminado
            setMensajes(mensajes.filter((msg) => msg.id !== id));

            // Limpia el detalle si se está mostrando el mensaje eliminado
            if (mensajeSeleccionado?.id === id) {
                setMensajeSeleccionado(null);
                setError(null);
            }
        } catch (error) {
            console.error('Error al eliminar notificación:', error);
            setError('Error al eliminar la notificación. Por favor, intente nuevamente.');
        }
    };

    // Inicia la edición de un mensaje
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

    // Guarda los cambios realizados a un mensaje
    const handleGuardarEdicion = async (id, e) => {
        e.stopPropagation();
        try {
            const datosActualizados = {
                titulo: mensajeEditado.titulo,
                contenido: mensajeEditado.contenido,
                id_admin: 1,
                nombre_admin: 'Juan Perez' // Datos fijos por ahora
            };

            const response = await axios.put(
                `http://localhost:8000/api/notificaciones/${id}`,
                datosActualizados,
                { withCredentials: true }
            );

            // Actualiza el mensaje en el estado
            setMensajes(
                mensajes.map((m) => m.id === id ? response.data : m)
            );
            setEditandoMensajeId(null); // Cierra el modo edición
            setMensajeEditado({});
            setError(null);
        } catch (error) {
            console.error('Error al actualizar notificación:', error);
            setError('Error al actualizar la notificación. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="container">
            <HeaderAd /> {/* Encabezado de administrador */}

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

                                {/* Modo edición */}
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
                                    </div>
                                )}
                            </div>

                            {/* Acciones: Editar y Eliminar */}
                            <div className="mensaje-acciones">
                                <FaEdit
                                    className={`accion-icono ${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
                                    onClick={(e) => handleEditarMensaje(mensaje.id, e)}
                                />
                                <FaTrash
                                    className={`accion-icono ${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
                                    onClick={(e) => handleEliminarMensaje(mensaje.id, e)}
                                />
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

            <Footer /> {/* Pie de página */}
        </div>
    );
};

export default Notificaciones;

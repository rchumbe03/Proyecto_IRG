import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './Notificaciones.css';
import HeaderAd from '../Headers/jsx/HeaderAd.jsx';
import Footer from '../Footer.jsx';

const Notificaciones = () => {
    const [mensajes, setMensajes] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoMensaje, setNuevoMensaje] = useState({ titulo: '', contenido: '' });
    const [editandoMensajeId, setEditandoMensajeId] = useState(null);
    const [mensajeEditado, setMensajeEditado] = useState({});
    const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
    const [error, setError] = useState(null);

    // Efecto para cargar los mensajes al montar el componente
    useEffect(() => {
        fetchMensajes();
    }, []);

    // Función para obtener mensajes de la API
    const fetchMensajes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notificaciones', {
                withCredentials: true
            });
            setMensajes(response.data);
            setError(null); // Limpiar error si la operación es exitosa
        } catch (error) {
            console.error('Error al obtener notificaciones:', error);
            setError('Error al cargar las notificaciones. Por favor, intente nuevamente.');
        }
    };

    const formatearFecha = (fecha) => {
        return fecha.split('T')[0];
    };

    const handleMensajeClick = (mensaje) => {
        setMensajeSeleccionado(mensaje);
    };

    // Función para agregar mensaje
    const handleAgregarMensaje = async () => {
        if (nuevoMensaje.titulo.trim() && nuevoMensaje.contenido.trim()) {
            try {
                const datosNuevoMensaje = {
                    titulo: nuevoMensaje.titulo,
                    contenido: nuevoMensaje.contenido,
                    id_admin: 1, // Esto debería venir de tu estado de autenticación
                    nombre_admin: 'Admin' // Esto debería venir de tu estado de autenticación
                };

                const response = await axios.post(
                    'http://localhost:8000/api/notificaciones',
                    datosNuevoMensaje,
                    { withCredentials: true }
                );

                setMensajes([...mensajes, response.data]);
                setNuevoMensaje({ titulo: '', contenido: '' });
                setMostrarFormulario(false);
            } catch (error) {
                console.error('Error al agregar notificación:', error);
                setError('Error al agregar la notificación. Por favor, intente nuevamente.');
            }
        }
    };

    // Función para eliminar mensaje
    const handleEliminarMensaje = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://localhost:8000/api/notificaciones/${id}`, {
                withCredentials: true
            });

            setMensajes(mensajes.filter((msg) => msg.id !== id));
            if (mensajeSeleccionado?.id === id) {
                setMensajeSeleccionado(null);
                setError(null); // Limpiar error si la operación es exitosa
            }
        } catch (error) {
            console.error('Error al eliminar notificación:', error);
            setError('Error al eliminar la notificación. Por favor, intente nuevamente.');
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

    // Función para guardar edición
    const handleGuardarEdicion = async (id, e) => {
        e.stopPropagation();
        try {
            const datosActualizados = {
                titulo: mensajeEditado.titulo,
                contenido: mensajeEditado.contenido,
                id_admin: 1, // Esto debería venir de tu estado de autenticación
                nombre_admin: 'Admin' // Esto debería venir de tu estado de autenticación
            };

            const response = await axios.put(
                `http://localhost:8000/api/notificaciones/${id}`,
                datosActualizados,
                { withCredentials: true }
            );

            setMensajes(
                mensajes.map((m) => m.id === id ? response.data : m)
            );
            setEditandoMensajeId(null);
            setMensajeEditado({});
            setError(null); // Limpiar error si la operación es exitosa
        } catch (error) {
            console.error('Error al actualizar notificación:', error);
            setError('Error al actualizar la notificación. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="container">
            <HeaderAd />
            {error && (
                <div className="error-mensaje">
                    {error}
                </div>
            )}
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
                                    <>
                                        <input
                                            type="text"
                                            value={mensajeEditado.titulo || ''}
                                            onChange={(e) => setMensajeEditado({
                                                ...mensajeEditado,
                                                titulo: e.target.value
                                            })}
                                            className="editar-titulo"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <textarea
                                            value={mensajeEditado.contenido || ''}
                                            onChange={(e) => setMensajeEditado({
                                                ...mensajeEditado,
                                                contenido: e.target.value
                                            })}
                                            className="editar-contenido"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="botones-edicion">
                                            <button onClick={(e) => handleGuardarEdicion(mensaje.id, e)}>
                                                Guardar
                                            </button>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                setEditandoMensajeId(null);
                                            }}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="mensaje-contenido">{mensaje.contenido}</p>
                                )}
                            </div>

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

                <div className="mensaje-detalle">
                    {mensajeSeleccionado ? (
                        <div className="detalle-frame">
                            <div className="detalle-titulo-frame">
                                <h1 className="detalle-titulo">{mensajeSeleccionado.titulo}</h1>
                                <span className="detalle-fecha">{formatearFecha(mensajeSeleccionado.created_at)}</span>
                                <h2 className="detalle-admin">{mensajeSeleccionado.nombre_admin}</h2>
                            </div>
                            <p className="detalle-contenido">{mensajeSeleccionado.contenido}</p>
                        </div>
                    ) : null}

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

export default Notificaciones;

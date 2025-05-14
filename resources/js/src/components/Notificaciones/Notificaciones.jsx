import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        fetchMensajes();
    }, []);

    const fetchMensajes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notificaciones', {
                withCredentials: true
            });
            setMensajes(response.data);
            setError(null);
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

    const handleAgregarMensaje = async () => {
        if (nuevoMensaje.titulo.trim() && nuevoMensaje.contenido.trim()) {
            try {
                const datosNuevoMensaje = {
                    titulo: nuevoMensaje.titulo,
                    contenido: nuevoMensaje.contenido,
                    id_admin: 1,
                    nombre_admin: 'Administrador'
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
                    setMensajes([...mensajes, response.data]);
                    setNuevoMensaje({ titulo: '', contenido: '' });
                    setMostrarFormulario(false);
                    setError(null);
                }
            } catch (error) {
                console.error('Error al agregar notificación:', error);
                if (error.response?.data?.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setError(errorMessages.join(', '));
                } else {
                    setError('Error al agregar la notificación. Por favor, intente nuevamente.');
                }
            }
        } else {
            setError('Por favor, complete todos los campos requeridos.');
        }
    };

    const handleEliminarMensaje = async (id, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`http://localhost:8000/api/notificaciones/\${id}`, {
                withCredentials: true
            });

            setMensajes(mensajes.filter((msg) => msg.id !== id));

            if (mensajeSeleccionado?.id === id) {
                setMensajeSeleccionado(null);
                setError(null);
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

    const handleGuardarEdicion = async (id, e) => {
        e.stopPropagation();
        try {
            const datosActualizados = {
                titulo: mensajeEditado.titulo,
                contenido: mensajeEditado.contenido,
                id_admin: 1,
                nombre_admin: 'Admin'
            };

            const response = await axios.put(
                `http://localhost:8000/api/notificaciones/\${id}`,
                datosActualizados,
                { withCredentials: true }
            );

            setMensajes(
                mensajes.map((m) => m.id === id ? response.data : m)
            );
            setEditandoMensajeId(null);
            setMensajeEditado({});
            setError(null);
        } catch (error) {
            console.error('Error al actualizar notificación:', error);
            setError('Error al actualizar la notificación. Por favor, intente nuevamente.');
        }
    };

    return (
        <div className="container">
            <HeaderAd />
            {error && <div className="error-mensaje">{error}</div>}
            <div className="notificaciones-container">
                <div className="mensajes-lista">
                    {mensajes.map((mensaje) => (
                        <div
                            key={mensaje.id}
                            className={`mensaje-card \${mensajeSeleccionado?.id === mensaje.id ? 'seleccionado' : ''}`}
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
                        </div>
                    ))}
                </div>

                <div className="mensaje-detalle">
                    {mensajeSeleccionado && (
                        <div className="detalle-frame">
                            <div className="detalle-titulo-frame">
                                <h1 className="detalle-titulo">{mensajeSeleccionado.titulo}</h1>
                                <span className="detalle-fecha">{formatearFecha(mensajeSeleccionado.created_at)}</span>
                                <h2 className="detalle-admin">{mensajeSeleccionado.nombre_admin}</h2>
                            </div>
                            <p className="detalle-contenido">{mensajeSeleccionado.contenido}</p>
                        </div>
                    )}
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
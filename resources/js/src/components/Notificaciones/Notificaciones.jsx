import { FaEdit, FaTrash, FaPlus, FaEnvelope, FaTimes, FaPaperclip } from 'react-icons/fa';
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
                    id_admin: 1, // Asegúrate de que este ID exista en tu tabla de admins
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
                fetchMensajes(); // Refresh the messages list after adding a new message
                setNuevoMensaje({ titulo: '', contenido: '' });
                setMostrarFormulario(false);
            } catch (error) {
                console.error('Error al agregar mensaje:', error);
                setError('Error al agregar el mensaje. Por favor, intente nuevamente.');
            }
        }
    };

  const handleArchivoChange = (e) => {
    setNuevoMensaje({ ...nuevoMensaje, archivo: e.target.files[0] });
  };

  return (
    <div className="container">
      <HeaderAd />
      <div className="notificaciones-container">
        <div className="mensajes-lista">
          {mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={`mensaje-card ${mensajeSeleccionado?.id === mensaje.id ? 'mensaje-seleccionado' : ''}`}
              onClick={() => setMensajeSeleccionado(mensaje)}
            >
              <div className="mensaje-info">
                <strong>{mensaje.autor}</strong>
                <span>{mensaje.fecha}</span>
                {editandoMensajeId === mensaje.id ? (
                  <>
                    <textarea
                      value={mensajeEditado}
                      onChange={(e) => setMensajeEditado(e.target.value)}
                      className="textarea-editar"
                    />
                    <div className="botones-editar">
                      <button onClick={() => handleGuardarEdicion(mensaje.id)} className="boton-guardar">Guardar</button>
                      <button onClick={() => setEditandoMensajeId(null)} className="boton-cancelar">Cancelar</button>
                    </div>
                  </>
                ) : (
                  <p className="contenido-cortado">{mensaje.contenido}</p>
                )}

                {mensaje.archivo && (
                  <a href={URL.createObjectURL(mensaje.archivo)} target="_blank" rel="noopener noreferrer">
                    📎 Ver archivo adjunto
                  </a>
                )}
              </div>

              <div className="mensaje-acciones">
                <FaEdit className="accion-icono" onClick={(e) => { e.stopPropagation(); handleEditarMensaje(mensaje.id); }} />
                <FaTrash className="accion-icono" onClick={(e) => { e.stopPropagation(); handleEliminarMensaje(mensaje.id); }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mensaje-vacio">
          {mensajeSeleccionado ? (
            <div className="mensaje-contenido">
              <div className="mensaje-header">
                <div className="mensaje-autor-fecha">
                  <strong>{mensajeSeleccionado.autor}</strong>
                  <br />
                  <span>{mensajeSeleccionado.fecha}</span>
                </div>
                <FaTimes className="cerrar-chat" onClick={() => setMensajeSeleccionado(null)} />
              </div>
              <div className="mensaje-texto">
                <p>{mensajeSeleccionado.contenido}</p>
                {mensajeSeleccionado.archivo && (
                  <a href={URL.createObjectURL(mensajeSeleccionado.archivo)} target="_blank" rel="noopener noreferrer">
                    📎 Ver archivo adjunto
                  </a>
                )}
              </div>
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
        </div>

        {mostrarFormulario && (
          <div className="formulario-flotante">
            <h2>Nuevo mensaje</h2>
            <input
              type="text"
              placeholder="Asunto"
              value={nuevoMensaje.asunto}
              onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, asunto: e.target.value })}
            />
            <textarea
              placeholder="Descripción"
              value={nuevoMensaje.descripcion}
              onChange={(e) => setNuevoMensaje({ ...nuevoMensaje, descripcion: e.target.value })}
            ></textarea>

            <div className="adjuntar-archivo">
              <label className="archivo-label">
                <FaPaperclip /> Adjuntar archivo
                <input type="file" onChange={handleArchivoChange} style={{ display: 'none' }} />
              </label>
              {nuevoMensaje.archivo && <span style={{ marginLeft: '10px' }}>{nuevoMensaje.archivo.name}</span>}
            </div>

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

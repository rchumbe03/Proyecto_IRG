import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEnvelope } from 'react-icons/fa';
import './Notificaciones.css';
import HeaderPl from '../Headers/jsx/HeaderAd.jsx';
import Footer from '../Footer.jsx';

const Notificaciones = () => {
  const [mensajes, setMensajes] = useState([
    { id: 1, autor: 'Juan Pérez', fecha: '03/05/2025', contenido: 'Primer mensaje' },
    { id: 2, autor: 'Jorge Torres', fecha: '03/05/2025', contenido: 'Segundo mensaje' },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState({ asunto: '', descripcion: '' });

  const [editandoMensajeId, setEditandoMensajeId] = useState(null);
  const [mensajeEditado, setMensajeEditado] = useState('');

  const handleAgregarMensaje = () => {
    if (nuevoMensaje.asunto.trim() && nuevoMensaje.descripcion.trim()) {
      const nuevo = {
        id: Date.now(),
        autor: 'Nuevo Autor',
        fecha: new Date().toLocaleDateString(),
        contenido: nuevoMensaje.descripcion,
      };
      setMensajes([...mensajes, nuevo]);
      setNuevoMensaje({ asunto: '', descripcion: '' });
      setMostrarFormulario(false);
    }
  };

  const handleEliminarMensaje = (id) => {
    setMensajes(mensajes.filter((msg) => msg.id !== id));
  };

  const handleEditarMensaje = (id) => {
    const mensaje = mensajes.find((m) => m.id === id);
    if (mensaje) {
      setEditandoMensajeId(id);
      setMensajeEditado(mensaje.contenido);
    }
  };

  const handleGuardarEdicion = (id) => {
    setMensajes(
      mensajes.map((m) =>
        m.id === id ? { ...m, contenido: mensajeEditado } : m
      )
    );
    setEditandoMensajeId(null);
    setMensajeEditado('');
  };

  return (
    <div className="container">
    <HeaderPl />
    <div className="notificaciones-container">
      <div className="mensajes-lista">
        {mensajes.map((mensaje) => (
          <div key={mensaje.id} className="mensaje-card">
            <div className="mensaje-info">
              <strong>{mensaje.autor}</strong>
              <span>{mensaje.fecha}</span>

              {editandoMensajeId === mensaje.id ? (
                <>
                  <textarea
                    value={mensajeEditado}
                    onChange={(e) => setMensajeEditado(e.target.value)}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                  <div style={{ marginTop: '5px' }}>
                    <button onClick={() => handleGuardarEdicion(mensaje.id)} style={{ marginRight: '5px' }}>
                      Guardar
                    </button>
                    <button onClick={() => setEditandoMensajeId(null)}>
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <p>{mensaje.contenido}</p>
              )}
            </div>

            <div className="mensaje-acciones">
              <FaEdit className="accion-icono" onClick={() => handleEditarMensaje(mensaje.id)} />
              <FaTrash className="accion-icono" onClick={() => handleEliminarMensaje(mensaje.id)} />
            </div>
          </div>
        ))}
      </div>

      <div className="mensaje-vacio">
        <FaEnvelope className="sobre-icono" />
        <p>No se han seleccionado conversaciones.</p>
        <button className="agregar-btn" onClick={() => setMostrarFormulario(true)}>
          Agregar <FaPlus style={{ marginLeft: '5px' }} />
        </button>
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

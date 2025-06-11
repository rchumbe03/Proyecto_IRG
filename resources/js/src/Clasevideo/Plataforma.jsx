import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import './LiveClass.css';
import spotify from '../../../js/src/assets/logos/spotify.png';
import Header from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';

export default function LiveClass() {
  const [activeTab, setActiveTab] = useState('descripcion');
  const [clases, setClases] = useState([]);
  const [claseActual, setClaseActual] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/clases')
      .then((res) => {
        setClases(res.data);
        setClaseActual(res.data[0]); // Primera clase por defecto
      })
      .catch((err) => console.error('Error al cargar las clases:', err));
  }, []);

  return (
    <div className="live-class">
      <Header />

      <div className="lc-header-wrapper lc-header">
        <button className="lc-back">
          <FaArrowLeft /> Volver
        </button>
        <div className="lc-nav">
          <button><FaChevronLeft /></button>
          <button><FaChevronRight /></button>
        </div>
      </div>

      <div className="lc-body">
        <div className="lc-main">
          <h1 className="lc-title">CLASES EN VIVO - GENERACIÓN 2025</h1>

          <div className="lc-progress-bar">
            <div
              className="lc-progress"
              style={{
                width: `${(clases.findIndex(c => c.id === claseActual?.id) + 1) / clases.length * 100}%`,
              }}
            />
          </div>

          {claseActual ? (
            <div className="lc-image-container video-container">
              <iframe
                className="lc-video"
                src={claseActual.url}
                title={claseActual.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <img src={spotify} alt="Logo" className="lc-logo-overlay" />
            </div>
          ) : (
            <p>Cargando clase...</p>
          )}

          <div className="lc-tabs">
            <button
              className={activeTab === 'descripcion' ? 'active' : ''}
              onClick={() => setActiveTab('descripcion')}
            >
              Descripción
            </button>
            <button
              className={activeTab === 'materiales' ? 'active' : ''}
              onClick={() => setActiveTab('materiales')}
            >
              Materiales
            </button>
          </div>

          <div className="lc-tab-content">
            {activeTab === 'descripcion' && (
              <>
                <p>Clase actual: <strong>{claseActual?.titulo || '---'}</strong></p>
                <p>Tipo: {claseActual?.tipo || '---'}</p>
              </>
            )}
            {activeTab === 'materiales' && (
              <ul>
                <li>Material 1</li>
                <li>Material 2</li>
                <li>Material 3</li>
              </ul>
            )}
          </div>

          <div className="lc-comments-section">
            <h2>Comentarios</h2>
            <div className="lc-comment-input">
              <div className="lc-avatar">SW</div>
              <input
                type="text"
                placeholder="¿Quieres comentar algo sobre esta clase?"
              />
            </div>
            <p className="lc-no-comments">
              Todavía no hay comentarios.<br />
              Sé la primera persona en comentar algo.
            </p>
          </div>
        </div>

        {/* Sidebar con clases dinámicas */}
        <aside className="lc-sidebar">
          {clases.map((clase, index) => (
            <div
              key={clase.id}
              className={`lc-lesson-item ${claseActual?.id === clase.id ? 'active' : ''}`}
              onClick={() => setClaseActual(clase)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`lc-lesson-circle ${index < 9 ? 'completed' : 'in-progress'}`}>
                {index < 9 ? <FaCheckCircle /> : <FaClock />}
                <span>{index + 1}</span>
              </div>
              <div className="lc-lesson-status">{clase.titulo}</div>
            </div>
          ))}
        </aside>
      </div>

      <Footer />
    </div>
  );
}

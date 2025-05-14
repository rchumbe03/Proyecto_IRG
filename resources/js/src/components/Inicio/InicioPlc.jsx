import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './InicioPlc.css';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

const niveles = ['Base', 'Profesional', 'Avanzado', 'Experto'];

const contenidoEjemplo = [
  { id: 1, titulo: 'Introducción al curso', estado: 'Completado', nivel: 'Base', archivos: ['Clase1.pdf', 'Guía1.docx'] },
  { id: 2, titulo: 'Fundamentos básicos', estado: 'Completado', nivel: 'Base', archivos: ['Clase2.pdf'] },
  { id: 3, titulo: 'Fundamentos básicos ii', estado: 'Completado', nivel: 'Base', archivos: ['Clase2.pdf'] },
  { id: 4, titulo: 'Fundamentos básicos iii', estado: 'En proceso', nivel: 'Base', archivos: ['Clase2.pdf'] },
  { id: 5, titulo: 'Ventas', estado: 'Bloqueado', nivel: 'Base', archivos: ['Clase2.pdf'] },
  { id: 6, titulo: 'Ventas ii', estado: 'Bloqueado', nivel: 'Base', archivos: ['Clase2.pdf'] },
  { id: 7, titulo: 'Temas intermedios', estado: 'Bloqueado', nivel: 'Profesional', archivos: [] },
  { id: 8, titulo: 'Conceptos avanzados', estado: 'Bloqueado', nivel: 'Avanzado', archivos: [] },
  { id: 9, titulo: 'Proyecto final', estado: 'Bloqueado', nivel: 'Experto', archivos: [] },
  { id: 10, titulo: 'Diseño', estado: 'Bloqueado', nivel: 'Profesional', archivos: [] },
];

const InicioPlc = () => {
  const [nivelActivo, setNivelActivo] = useState('Base');
  const [busqueda, setBusqueda] = useState('');
  const [expandido, setExpandido] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleItem = (id) => {
    setExpandido((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const contenidoFiltrado = contenidoEjemplo.filter(
    (item) =>
      item.nivel === nivelActivo &&
      item.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-theme' : ''}`}>
      <HeaderPl toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      <section className="contenidos">
        <h2>Contenidos</h2>

        <div className="tabs">
          {niveles.map((nivel) => (
            <button
              key={nivel}
              className={`tab ${nivelActivo === nivel ? 'active' : ''}`}
              onClick={() => setNivelActivo(nivel)}
            >
              {nivel}
            </button>
          ))}
          <input
            type="text"
            placeholder="Buscar contenido"
            className="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <ul className="contenido-lista">
          {contenidoFiltrado.map((item, index) => (
            <li key={item.id} className={`contenido-item ${isDarkMode ? 'dark-theme' : ''}`}>
              <div className="item-header">
                <div className="numero">{index + 1}</div>

                <div className="info">
                  <div className="titulo">{item.titulo}</div>
                  <div className={`estado ${item.estado === 'Completado' ? 'completado' : item.estado === 'Bloqueado' ? 'bloqueado' : 'proceso'}`}>
                    {item.estado === 'Completado'
                      ? '✔ Completado'
                      : item.estado === 'Bloqueado'
                      ? '🚫 Bloqueado'
                      : '⏳ En proceso'}
                  </div>
                </div>

                <button className="toggle" onClick={() => toggleItem(item.id)}>
                  {expandido.includes(item.id) ? '▲' : '▼'}
                </button>
              </div>

              {expandido.includes(item.id) && (
                <div className="item-body">
                  {item.archivos.length > 0 ? (
                    <ul>
                      {item.archivos.map((archivo, i) => (
                        <li key={i}>
                          <a href={`/archivos/${archivo}`} target="_blank" rel="noreferrer">
                            {archivo}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hay archivos disponibles.</p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default InicioPlc;




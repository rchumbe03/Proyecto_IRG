import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './InicioPlc.css';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

const niveles = ['Base', 'Profesional', 'Avanzado', 'Experto'];

const InicioPlc = () => {
  const [nivelActivo, setNivelActivo] = useState('Base');
  const [busqueda, setBusqueda] = useState('');
  const [expandido, setExpandido] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/temas');
        if (!response.ok) {
          throw new Error('Error al obtener los temas');
        }
        const data = await response.json();
        // Adaptar el nivel según el nombre de la fase
        const temasAdaptados = data.map((tema) => ({
          id: tema.id,
          titulo: tema.titulo,
          estado: tema.estado || '',
          nivel: tema.fase?.nombre || 'Base', // Aquí se usa el nombre de la fase como nivel
          archivos: tema.archivos || [],
        }));
        setTemas(temasAdaptados);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemas();
  }, []);

  const toggleItem = (id) => {
    setExpandido((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const contenidoFiltrado = temas.filter(
    (item) =>
      item.nivel === nivelActivo &&
      item.estado !== 'Bloqueado' &&
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

        {loading ? (
          <p>Cargando temas...</p>
        ) : (
          <ul className="contenido-lista">
            {contenidoFiltrado.map((item, index) => (
              <li key={item.id} className={`contenido-item ${isDarkMode ? 'dark-theme' : ''}`}>
                <div className="item-header">
                  <div className="numero">{index + 1}</div>

                  <div className="info">
                    <div className="titulo">{item.titulo}</div>
                    {item.estado && (
                      <div className={`estado ${item.estado === 'Completado' ? 'completado' : 'proceso'}`}>
                        {item.estado === 'Completado'
                          ? '✔ Completado'
                          : '⏳ En proceso'}
                      </div>
                    )}
                  </div>

                  <button className="toggle" onClick={() => toggleItem(item.id)}>
                    {expandido.includes(item.id) ? '▲' : '▼'}
                  </button>
                </div>

                {expandido.includes(item.id) && (
                  <div className="item-body">
                    {item.archivos && item.archivos.length > 0 ? (
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
        )}
      </section>

      <Footer />
    </div>
  );
};

export default InicioPlc;





import React, { useState, useEffect } from 'react';
import './InicioPlc.css';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

const niveles = ['Base', 'Profesional', 'Avanzado', 'Experto'];

const fetchWithErrorHandling = async (url) => {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        return {
            error: `Error al cargar los datos (${response.status})`,
            status: response.status
        };
    }

    const data = await response.json();
    return { data };
};

const InicioPlc = () => {
    const [nivelActivo, setNivelActivo] = useState('Base');
    const [busqueda, setBusqueda] = useState('');
    const [expandido, setExpandido] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            const [temasResult, clasesResult] = await Promise.all([
                fetchWithErrorHandling('http://localhost:8000/api/temas'),
                fetchWithErrorHandling('http://localhost:8000/api/clases')
            ]);

            if (temasResult.error || clasesResult.error) {
                setError(temasResult.error || clasesResult.error);
                setLoading(false);
                return;
            }

            const temasAdaptados = temasResult.data.map(tema => ({
                id: tema.id,
                titulo: tema.titulo,
                estado: tema.estado || '',
                nivel: tema.fase?.nombre || 'Base',
                clases: clasesResult.data.filter(clase => clase.id_tema === tema.id)
            }));

            setTemas(temasAdaptados);
            setLoading(false);
        };

        loadData();
    }, []);

    const toggleItem = (id) => {
        setExpandido(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const contenidoFiltrado = temas.filter(item =>
        item.nivel === nivelActivo &&
        item.estado !== 'Bloqueado' &&
        item.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className={`container ${isDarkMode ? 'dark-theme' : ''}`}>
            <HeaderPl
                toggleDarkMode={() => setIsDarkMode(prev => !prev)}
                isDarkMode={isDarkMode}
            />

            <section className="contenidos">
                <h2>Contenidos</h2>

                <div className="tabs">
                    {niveles.map(nivel => (
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
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>

                {loading && <p>Cargando contenido...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <ul className="contenido-lista">
                        {contenidoFiltrado.map((item, index) => (
                            <li key={item.id} className={`contenido-item ${isDarkMode ? 'dark-theme' : ''}`}>
                                <div className="item-header">
                                    <div className="numero">{index + 1}</div>
                                    <div className="info">
                                        <div className="titulo">{item.titulo}</div>
                                        {item.estado && (
                                            <div className={`estado ${item.estado === 'Completado' ? 'completado' : 'proceso'}`}>
                                                {item.estado === 'Completado' ? '✔ Completado' : '⏳ En proceso'}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="toggle"
                                        onClick={() => toggleItem(item.id)}
                                        aria-label={expandido.includes(item.id) ? 'Cerrar tema' : 'Abrir tema'}
                                    >
                                        {expandido.includes(item.id) ? '▲' : '▼'}
                                    </button>
                                </div>

                                {expandido.includes(item.id) && (
                                    <div className="item-body">
                                        <h3>Clases del tema</h3>
                                        {item.clases && item.clases.length > 0 ? (
                                            <ul className="clases-lista">
                                                {item.clases.map(clase => (
                                                    <li key={clase.id} className="clase-item">
                                                        <span className="clase-titulo">{clase.titulo}</span>
                                                        <span className={`clase-tipo tipo-${clase.tipo?.toLowerCase()}`}>
                              {clase.tipo}
                            </span>
                                                        {clase.url && (
                                                            <a
                                                                href={clase.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="clase-link"
                                                            >
                                                                Ver clase
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-clases">No hay clases disponibles para este tema.</p>
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

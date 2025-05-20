// InicioPl.jsx
import React, { useState, useEffect } from 'react';
import './InicioPl.css';
import logo from '../../assets/logos/logo.png';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

// Constantes
const niveles = ['Base', 'Profesional', 'Avanzado', 'Experto'];

// Función auxiliar para manejar las peticiones
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

const InicioPl = () => {
    // Estados compartidos
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Estados para la sección de plataforma
    const [progreso] = useState(90);

    // Estados para la sección de contenidos
    const [nivelActivo, setNivelActivo] = useState('Base');
    const [busqueda, setBusqueda] = useState('');
    const [expandido, setExpandido] = useState([]);
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efectos
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
    tipo: tema.tipo, // <-- Agrega esta línea
    estado: tema.estado || '',
    nivel: tema.fase?.nombre || 'Base',
    clases: clasesResult.data.filter(clase => clase.id_tema === tema.id)
}));

            setTemas(temasAdaptados);
            setLoading(false);
        };

        loadData();
    }, []);

    // Funciones auxiliares
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
        <div className={`inicio-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
            <HeaderPl
                toggleDarkMode={() => setIsDarkMode(prev => !prev)}
                isDarkMode={isDarkMode}
            />

            {/* Sección de Plataforma */}
            <div className="plataforma-container">
                <div className="plataforma-left">
                    <button className="volver-btn">← Volver</button>
                    <h1 className="plataforma-titulo">¡Pasa al siguiente nivel!</h1>

                    <div className="barras">
                        <div ><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Provident, assumenda voluptatibus placeat optio quod adipisci nemo sequi labore,
                            incidunt soluta vitae accusamus quia neque, perspiciatis iure quasi omnis porro ipsam.</h3></div>
                        <div ><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
                            assumenda voluptatibus placeat optio quod adipisci nemo sequi labore,
                            incidunt soluta vitae accusamus quia neque, perspiciatis iure quasi omnis porro ipsam.</h3></div>
                        <div ><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
                            assumenda voluptatibus placeat optio quod adipisci nemo sequi labore,
                            incidunt soluta vitae accusamus quia neque, perspiciatis iure quasi omnis porro ipsam.</h3></div>
                        <div className="barra-progreso-contenedor">
                            <span className="porcentaje">{progreso}%</span>
                            <div className="barra-progreso">
                                <div className="relleno" style={{ width: `${progreso}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <button className="ver-btn">Ver de nuevo</button>
                </div>

                <div className="plataforma-right">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
            </div>

            {/* Sección de Contenidos */}
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
                                        <div className="contenido-titulo">
    {item.titulo}
    <span className={`tema-tipo tipo-${item.tipo?.toLowerCase()}`}>
        {item.tipo}
    </span>
</div>
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

export default InicioPl;

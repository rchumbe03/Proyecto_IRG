// InicioPl.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InicioPl.css';
import logo from '../assets/logos/logo.png';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';

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
    const [progreso, setProgreso] = useState(0); // Cambia el valor inicial a 0

    // Supón que tienes el userId disponible
    const userId = 1; // Cambia esto según tu lógica de autenticación

    // Estados para la sección de contenidos
    const [nivelActivo, setNivelActivo] = useState('Base');
    const [busqueda, setBusqueda] = useState('');
    const [expandido, setExpandido] = useState([]);
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [temaSeleccionado, setTemaSeleccionado] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    const navigate = useNavigate();

    // Efectos
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            const [temasResult, clasesResult] = await Promise.all([
                fetchWithErrorHandling('http://localhost:8000/api/temas'),
                fetchWithErrorHandling('http://localhost:8000/api/clases'), 

            ]);

            if (temasResult.error || clasesResult.error) {
                setError(temasResult.error || clasesResult.error);
                setLoading(false);
                return;
            }

            const temasAdaptados = temasResult.data.map(tema => ({
                id: tema.id,
                titulo: tema.titulo,
                descripcion: tema.descripcion, // <-- Agrega esta línea
                estado: tema.estado || '',
                nivel: tema.fase?.nombre || 'Base',
                clases: clasesResult.data.filter(clase => clase.id_tema === tema.id)
            }));

            setTemas(temasAdaptados);
            setLoading(false);
        };

        // Cargar expediente del usuario
        const loadExpediente = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/expediente/${id_usuario}`);
                if (!response.ok) throw new Error('No se pudo cargar el expediente');
                const data = await response.json();
                setProgreso(data.porcentaje || 0); // Ajusta el nombre del campo según tu API
            } catch (err) {
                setProgreso(0);
            }
        };

        loadData();
        loadExpediente();
    }, [userId]);

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
                    <button
                        className="volver-btn"
                        onClick={() => navigate('/cursos')}
                    >
                        ← Volver
                    </button>
                    <h1 className="plataforma-titulo">¡Pasa al siguiente nivel!</h1>

                    <div className="descripcion">
                        <div>
                            <h3>
                                {cursoSeleccionado
                                    ? cursoSeleccionado.descripcion || 'Descripción no disponible.'
                                    : 'Selecciona un curso para ver la descripción.'}
                            </h3>
                        </div>
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
                            <li
                                key={item.id}
                                className={`contenido-item ${isDarkMode ? 'dark-theme' : ''}`}
                                onClick={() => setTemaSeleccionado(item)}
                            >
                                <div className="item-header">
                                    <div className="numero">{index + 1}</div>
                                    <div className="info">
                                        <div className="contenido-titulo">{item.titulo}</div>
                                        {item.estado && (
                                            <div className={`estado ${item.estado === 'Completado' ? 'completado' : 'proceso'}`}>
                                                {item.estado === 'Completado' ? '✔ Completado' : '⏳ En proceso'}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="toggle"
                                        onClick={e => {
                                            e.stopPropagation();
                                            toggleItem(item.id);
                                        }}
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

            <div className="lista-cursos">
                {cursos.map(curso => (
                    <div
                        key={curso.id}
                        className={`curso-item${cursoSeleccionado && cursoSeleccionado.id === curso.id ? ' seleccionado' : ''}`}
                        onClick={() => setCursoSeleccionado(curso)}
                        style={{ cursor: 'pointer', margin: '8px 0', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        {curso.titulo}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default InicioPl;

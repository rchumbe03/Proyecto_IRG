// ==============================
// IMPORTACIONES
// ==============================
import React, { useState, useEffect } from 'react';
import './InicioPl.css';
import logo from '../assets/logos/logo.png';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useNavigate, useParams } from 'react-router-dom'; //importado para los cursos

// ==============================
// CONSTANTES
// ==============================
const NIVELES = ['Base', 'Profesional', 'Avanzado', 'Experto'];

// ==============================
// FUNCIONES AUXILIARES
// ==============================
/**
 * Realiza una petición fetch y maneja errores.
 * @param {string} url
 * @returns {Promise<{data?: any, error?: string, status?: number}>}
 */
const fetchWithErrorHandling = async (url) => {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        return { error: `Error al cargar los datos (${response.status})`, status: response.status };
    }
    const data = await response.json();
    return { data };
};

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
/**
 * Componente principal de la plataforma de inicio.
 * Muestra los temas y clases filtrados por nivel y búsqueda.
 */
function InicioPl() {
    // ------------------------------
    // ESTADOS
    // ------------------------------
    const [isDarkMode, setIsDarkMode] = useState(false); // Modo oscuro
    const [nivelActivo, setNivelActivo] = useState('Base'); // Nivel seleccionado
    const [busqueda, setBusqueda] = useState(''); // Texto de búsqueda
    const [descripcionCurso, setDescripcionCurso] = useState('');
    const [expandido, setExpandido] = useState([]); // IDs de temas expandidos
    const [temas, setTemas] = useState([]); // Lista de temas cargados
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Mensaje de error

    const navigate = useNavigate();

    // ------------------------------
    // EFECTO: CARGA INICIAL DE DATOS
    // ------------------------------

     // Definir cursoId como constante
            const { id } = useParams();
            const cursoId = parseInt(id); // convierto a número para que coincida con el id_curso de los temas

    useEffect(() => {
        const fetchDescripcion = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/cursos/${cursoId}`);
                const data = await response.json();
                setDescripcionCurso(data.descripcion || 'Descripción no disponible');
            } catch (error) {
                console.error('Error al cargar la descripción del curso:', error.message);
                setError(error.message); // Guarda el mensaje de error en el estado
            }
        };
        const loadData = async () => {
            try {
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
                    ...tema,
                    nivel: tema.fase?.nombre || 'Base',
                    clases: clasesResult.data.filter(clase => clase.id_tema === tema.id),
                }));

                setTemas(temasAdaptados);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        fetchDescripcion();
        loadData();
    }, []);

    // ------------------------------
    // FUNCIONES DE UI
    // ------------------------------
    // Alterna expansión de un tema
    const toggleItem = (id) => {
        setExpandido(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    // Filtrar temas (asegúrate de que id_curso exista en los datos)
    const contenidoFiltrado = temas.filter(item =>
        item.nivel === nivelActivo &&
        item.estado !== 'Bloqueado' &&
        item.titulo.toLowerCase().includes(busqueda.toLowerCase()) &&
        item.id_curso === cursoId
    );

    // ------------------------------
    // RENDERIZADO
    // ------------------------------
    return (
        <div className={`inicio-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
            {/* Encabezado con modo oscuro */}
            <HeaderPl
                toggleDarkMode={() => setIsDarkMode(prev => !prev)}
                isDarkMode={isDarkMode}
            />

            {/* Sección de Plataforma */}
            <div className="plataforma-container">
                <div className="plataforma-left">
                    <button className="volver-btn" onClick={() => navigate('/cursos')}>
                        ← Volver
                    </button>
                    <h1 className="plataforma-titulo">¡Pasa al siguiente nivel!</h1>

                    {/* Barra de progreso */}
                    <div className="descripcion">
                        <h3>{descripcionCurso || 'Selecciona un curso para ver la descripción.'}</h3>
                        <div className="barra-progreso-contenedor">
                            <span className="porcentaje">90%</span>
                            <div className="barra-progreso">
                                <div className="relleno" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>

                    <button className="ver-btn">Ver de nuevo</button>
                </div>

                {/* Imagen del logo */}
                <div className="plataforma-right">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
            </div>

            {/* Sección de Contenidos */}
            <section className="contenidos">
                <h2>Contenidos</h2>

                {/* Tabs de niveles y barra de búsqueda */}
                <div className="tabs">
                    {NIVELES.map(nivel => (
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

                {/* Mensajes de carga o error */}
                {loading && <p>Cargando contenido...</p>}
                {error && <p className="error-message">{error}</p>}

                {/* Lista de contenidos filtrados */}
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
                                    {/* Botón para expandir/cerrar tema */}
                                    <button
                                        className="toggle"
                                        onClick={() => toggleItem(item.id)}
                                        aria-label={expandido.includes(item.id) ? 'Cerrar tema' : 'Abrir tema'}
                                    >
                                        {expandido.includes(item.id) ? '▲' : '▼'}
                                    </button>
                                </div>

                                {/* Detalle del tema */}
                                {expandido.includes(item.id) && (
                                    <div className="item-body">
                                        <h3>Clases del tema</h3>
                                        {item.clases && item.clases.length > 0 ? (
                                            <ul className="clases-lista">
                                                {item.clases.map(clase => (
                                                    <li key={clase.id} className="clase-item">
                                                        <span className="clase-titulo">{clase.titulo}</span>
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

            {/* Pie de página */}
            <Footer />
        </div>
    );
}

export default InicioPl;

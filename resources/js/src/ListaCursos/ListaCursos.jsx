// ==============================
// IMPORTACIONES
// ==============================
import React, { useEffect, useState } from 'react';
import './ListaCursos.css';
import { useNavigate } from 'react-router-dom';  // --- AÑADIDO --- Importamos useNavigate para navegación
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import HeaderAdmin from '../components/Headers/jsx/HeaderAd.jsx';  //  import de HeaderAdmin para hacer los headers
import Footer from '../components/Footer/Footer.jsx';

// ==============================
// COMPONENTE PRINCIPAL
// ==============================
/**
 * ListaCursos muestra todos los cursos disponibles para el usuario.
 * Permite ver detalles y acceder a cada curso.
 */
const ListaCursos = () => {
    // ------------------------------
    // ESTADOS
    // ------------------------------
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        // Hook para navegación
    const navigate = useNavigate();

     //Estado userType para guardar el tipo de usuario
    const [userType, setUserType] = useState(null);  

// Lee el tipo de usuario desde localStorage al montar el componente
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.tipo) {
          setUserType(user.tipo);  // Aquí asignamos userType si está definido
        } else {
          setUserType('guest');    // Si no tiene tipo, asignamos guest como default
        }
      } catch (error) {
        console.error('Error parseando userData:', error);
        setUserType('guest');      // En caso de error asignamos guest
      }
    } else {
      setUserType('guest');        // Si no hay datos, asignamos guest
    }
    }, []);
    // ------------------------------
    // EFECTO: CARGA DE CURSOS
    // ------------------------------
    useEffect(() => {
        const fetchCursos = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('http://127.0.0.1:8000/api/cursos', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include',
                });
                if (!res.ok) {
                    setError('Error al obtener cursos');
                    setCursos([]);
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setCursos(data);
            } catch {
                setError('No se pudieron cargar los cursos.');
            } finally {
                setLoading(false);
            }
        };
        fetchCursos();
    }, []);

        // Aquí DEFINES rutaBase según userType
    // ====================================
    const rutaBase = userType === 'admin' ? 'admin' : 'pl';

    // ------------------------------
    // RENDERIZADO
    // ------------------------------
    return (
        <div className="cursos-container">
            {/* Mostrar Header según el tipo de usuario */}
            {userType === 'admin' ? <HeaderAdmin /> : <HeaderPl />}

            {/* Sección principal de cursos */}
            <div className="course-page">
                <h1 className="title">Mis Cursos</h1>

                {/* Mensajes de carga o error */}
                {loading && <p>Cargando cursos...</p>}
                {error && <p className="error-message">{error}</p>}

                {/* Lista de cursos */}
                {!loading && !error && (
                    <div className="course-list">
                        {cursos.map(course => (
                            <div key={course.id} className="course-card">
                                {/* Imagen del curso */}
                                <img
                                    src={course.imagen || '/images/default-course.png'}
                                    alt={course.titulo}
                                    className="course-img"
                                />
                                {/* Título y desarrollador */}
                                <h3 className="course-title">{course.titulo}</h3>
                                <p className="course-developer">{course.desarrollador}</p>
                                {/* Botones de acción */}
                                <div className="button-group">
                                    <button className="course-button">Detalles</button>
                                      <button
                                         className="course-button"
                                         onClick={() => navigate(`/${userType }/inicio/${course.id}`)}
                                         >
                                         Acceder
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default ListaCursos;

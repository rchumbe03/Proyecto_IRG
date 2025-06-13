import React, { useState, useEffect } from 'react';
import '../DetallesCurso/DetallesCurso.css';
import Footer from '../components/Footer/Footer.jsx';
import HeaderAd from '../components/Headers/jsx/HeaderIn.jsx';
import { FaClock, FaDesktop, FaDownload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import inmobiliaria2 from '../assets/img/inmobiliaria2.png';

const fases = [
  { nombre: 'Base' },
  { nombre: 'Profesional' },
  { nombre: 'Avanzado' },
  { nombre: 'Experto' },
];

const tiposEjemplo = ['video', 'video', 'virtual', 'virtual', 'presencial']; // Ejemplo, puedes reemplazarlo por tema.tipo

const DetallesCurso = () => {
  const [abierta, setAbierta] = useState(null);
  const [temasPorFase, setTemasPorFase] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTemasPorFase = async () => {
      setLoading(true);
      try {
        const promises = fases.map(async (fase) => {
          const res = await fetch(`http://localhost:8000/api/temas-por-curso-fase?curso_id=${id}&fase=${fase.nombre}`);
          const data = await res.json();
          return { [fase.nombre]: data };
        });
        const results = await Promise.all(promises);
        const obj = {};
        results.forEach((item) => Object.assign(obj, item));
        setTemasPorFase(obj);
      } catch {
        setTemasPorFase({});
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTemasPorFase();
  }, [id]);

  const togglePregunta = (index) => {
    setAbierta(abierta === index ? null : index);
  };

  // Badge para el tipo de clase, puedes enlazarlo luego con el tipo real
  const badgeClase = (tipo) => {
    if (!tipo) return null;
    return <span className={`badge-tema ${tipo}`}>{tipo}</span>;
  };

  return (
    <>
      {/*Parte superior*/}
      <div className="container dark-mode">
        <HeaderAd />
        <div className="contenedor-with-image">
          <div className="contenedor-texts">
            <h1>Título del curso completo</h1>
            <h3>Más de 100 cursos completos</h3>
            <div className="phrase-container">
              <p>
                El sector inmobiliario ofrece oportunidades únicas para invertir y crecer profesionalmente. 
                Aprenderás a gestionar propiedades, analizar el mercado y cerrar negociaciones exitosas. 
                Conoce las mejores prácticas para destacar en el mundo de bienes raíces.
              </p>
              <div className="three-containers">
                <div className="container-item">
                  <FaClock className="icon-style" size={20} />
                  <div className="container-text">10 semanas</div>
                </div>
                <div className="separator">|</div>
                <div className="container-item">
                  <FaDesktop className="icon-style" size={20} />
                  <div className="container-text">Presencial y virtual</div>
                </div>
                <div className="separator">|</div>
                <div className="container-item">
                  <FaDownload className="icon-style" size={20} />
                  <div className="container-text">Contenido descargable</div>
                </div>
              </div>
            </div>
            <div className="phrase-container-lu">
              <h2>¿Que aprenderás con nosotros?</h2>
              <div className="phrase-list-container">
                <div className="phrase-list">
                  <ul>
                    <li>Frase 1</li>
                    <li>Frase 2</li>
                    <li>Frase 3 </li>
                  </ul>
                </div>
                <div className="phrase-list">
                  <ul>
                    <li>Frase 1 </li>
                    <li>Frase 2 </li>
                    <li>Frase 3 </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="image">
            <div className="imagen">
              <img src={inmobiliaria2} alt="Apretón de manos con modelo de casa" />
            </div>
            <div className="contenedor-image">
              <div className='dinero'><h1>0,00$</h1></div>
              <div className="yellow-container">
                <p>Comprar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Parte de contenidos*/}
      <div className="page-wrapper">
        <section className="contenido-curso">
          <h2 className="titulo">Contenido del curso</h2>
          <ul className="lista">
            {fases.map((fase, i) => (
              <li key={i} className="faq-item">
                <div className="barra-seccion" onClick={() => togglePregunta(i)}>
                  <span className="pregunta-nombre-tema">
                    <span className="nombre-fase">Fase de formación: {fase.nombre}</span>
                  </span>
                  <span className="simbolo">{abierta === i ? '-' : '+'}</span>
                </div>
                <div
                  className={`contenido${abierta === i ? ' contenido-abierta' : ''}`}
                  style={{ maxHeight: abierta === i ? '800px' : '0px' }}
                >
                  <div className="contenedor-temas-lista">
                    {loading ? (
                      <div className="tema-item">Cargando temas...</div>
                    ) : (temasPorFase[fase.nombre] && temasPorFase[fase.nombre].length > 0 ? (
                      temasPorFase[fase.nombre].map((tema, idx) => (
                        <div className="tema-item" key={tema.id}>
                          <span className="tema-num">{idx + 1}</span>
                          <span className="tema-titulo">{tema.titulo}</span>
                          {/* Badge: puedes cambiar el tipo por tema.tipo cuando lo tengas */}
                          {badgeClase(
                            // demo: alternando el badge para que veas el resultado visual
                            idx === 0
                              ? 'video'
                              : idx === 1
                              ? 'virtual'
                              : 'presencial'
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="tema-item">No hay temas disponibles para esta fase.</div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DetallesCurso;

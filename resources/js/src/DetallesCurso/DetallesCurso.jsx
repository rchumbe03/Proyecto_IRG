import React, { useState, useEffect } from 'react';
import '../DetallesCurso/DetallesCurso.css';
import Footer from '../components/Footer/Footer.jsx';
import HeaderAd from '../components/Headers/jsx/HeaderAd.jsx';
import { FaClock, FaDesktop, FaDownload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import inmobiliaria2 from '../assets/img/inmobiliaria2.png'

const fases = [
  { nombre: 'Base' },
  { nombre: 'Profesional' },
  { nombre: 'Avanzado' },
  { nombre: 'Experto' },
];

const DetallesCurso = () => {
  const [abierta, setAbierta] = useState(null);
  const [temasPorFase, setTemasPorFase] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Traer los temas por curso y fase
  useEffect(() => {
    const fetchTemasPorFase = async () => {
      setLoading(true);
      try {
        // Por cada fase, pide los temas
        const promises = fases.map(async (fase) => {
          const res = await fetch(`http://localhost:8000/api/temas-por-curso-fase?curso_id=${id}&fase=${fase.nombre}`);
          const data = await res.json();
          return { [fase.nombre]: data };
        });

        const results = await Promise.all(promises);
        // Junta los resultados en un solo objeto
        const obj = {};
        results.forEach((item) => {
          Object.assign(obj, item);
        });
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

  return (
    <>
      {/*Primera parte*/}
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

      {/*Segunda parte "Contenindo del curso"*/}
      <div className="page-wrapper">
        <section className="contenido-curso">
          <h2 className="titulo">Contenido del curso</h2>
          <ul className="lista">
            {fases.map((fase, i) => (
              <li key={i} className="faq-item">
                
                {/*PREGUNTA DEL CONTENIDO */}
                <div className="barra-seccion" onClick={() => togglePregunta(i)}>
                  <span className="pregunta">{`Fase de formación: ${fase.nombre}`}</span>
                  {/*SIMBOLO */}
                  <span className="simbolo">{abierta === i ? '-' : '+'}</span>
                </div>
                {/*RESPUESTA DEL CONTENIDO ABIERTO */}
                <div
                  className={`contenido${abierta === i ? ' contenido-abierta' : ''}`}
                  style={{ maxHeight: abierta === i ? '600px' : '0px' }}
                >


                  <ul>

                    
                    {loading ? (
                      <li className="faq-linea">Cargando temas...</li>
                    ) : (temasPorFase[fase.nombre] && temasPorFase[fase.nombre].length > 0 ? (
                      temasPorFase[fase.nombre].map((tema, idx) => (
                        <div className='nombre-temas' key={tema.id}>
                          <div className='numero-temas'>{idx + 1}</div>
                          <li className="faq-linea">{tema.titulo}</li>
                        </div>
                      ))
                    ) : (
                      <li className="faq-linea">No hay temas disponibles para esta fase.</li>
                    ))}

                    
                    <div className="presencial">
                      <div className='simbolo-presencial'>-</div>
                       Presencial
                    </div>
                    
                    <div className="presencial2">
                      <div className='simbolo-presencial2'>-</div>
                       Presencial
                    </div>

                    <div className="presencial3">
                      <div className='simbolo-presencial3'>-</div>
                       Presencial
                    </div>

                  </ul>
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

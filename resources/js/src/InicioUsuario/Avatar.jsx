import React, { useRef, useState, useEffect } from 'react';
import '../InicioUsuario/usuario.css';
import edificio from '../assets/img/edificio.png';
import Footer from '../components/Footer/Footer.jsx';

const ComunidadUnificada = () => {
  // Comentarios (InicioComunidad)
  const comentario = [
    {
      texto: '“La plataforma ha transformado mi forma de aprender. ¡Recomendada al 100%!”',
      autor: 'Juan Pérez',
    },
    {
      texto: '“Excelente contenido y atención, he crecido como profesional en meses.”',
      autor: 'Yorch Ascuy',
    },
    {
      texto: '“Los instructores son muy claros y los retos muy prácticos. ¡Bravo!”',
      autor: 'María García',
    },
    {
      texto: '“Una comunidad increíble, siempre dispuesta a ayudar. ¡Me siento parte de algo grande!”',
      autor: 'Carlos López',
    },
    {
      texto: '“He aprendido más en esta plataforma que en años de estudio tradicional. ¡Gracias!”',
      autor: 'Ana Torres',
    },
    {
      texto: '“Los cursos son muy completos y la interacción con otros estudiantes es genial.”',
      autor: 'Luis Fernández',
    }
  ];

  const [i, setI] = useState(0);
  const total = comentario.length;
  const containerRef = useRef(null);

  const prev = () => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const newIndex = i === 0 ? total - 1 : i - 1;
    setI(newIndex);
    containerRef.current.scrollTo({ left: newIndex * w, behavior: 'smooth' });
  };

  const next = () => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const newIndex = i === total - 1 ? 0 : i + 1;
    setI(newIndex);
    containerRef.current.scrollTo({ left: newIndex * w, behavior: 'smooth' });
  };

  // Preguntas frecuentes
  const preguntas = [
    {
      pregunta: "¿Cómo funciona IRG?",
      respuesta: [
        "IRG es una plataforma digital que conecta a creadores de contenido con estudiantes.",
      ]
    },
    {
      pregunta: "¿Cuánto cuesta utilizar IRG?",
      respuesta: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ]
    },
    {
      pregunta: "¿Cómo IRG me puede ayudar a crecer?",
      respuesta: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ]
    },
    {
      pregunta: "Todavía no tengo un curso digital listo, ¿IRG me puede ayudar?",
      respuesta: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ]
    },
    {
      pregunta: "Si tengo dudas para empezar con IRG, ¿pueden ayudarme?",
      respuesta: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ]
    }
  ];

  const [abierta, setAbierta] = useState(0);
  const togglePregunta = (idx) => {
    setAbierta(idx === abierta ? null : idx);
  };

  return (
    <>
      {/* InicioComunidad */}
      <main className="inicio-comunidad">
        <h1 className="titulo-comunidad">Qué dice nuestra comunidad…</h1>
        <div className="carrusel-wrapper">
          <button onClick={prev} className="nav prev">‹</button>
          <div className="slides-container" ref={containerRef}>
            <div className="slides">
              {comentario.map(({ texto, autor }, idx) => (
                <div className="slide" key={idx}>
                  <blockquote className="texto">{texto}</blockquote>
                  <p className="autor">— {autor}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={next} className="nav next">›</button>
        </div>
      </main>

      {/* FormaParte */}
      <section className="contenedor">
        <h1 className="titulo">¿Que esperas para formar parte?</h1>
        <div className="seccion-contenido">
          <img src={edificio} alt="imagen" className="imagen-cont" />
          <div className="texto-boton">
            <div className="texto">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi veniam modi fuga eum voluptates dolorem culpa velit repellat placeat tempore odio nisi iste repudiandae expedita laboriosam, minus ut reiciendis dicta.
              </p>
            </div>
            <button className="boton">Entrar</button>
          </div>
        </div>
      </section>

      {/* PreguntasFrecuentes */}
      <section className="preguntas-frecuentes">
        <h1 className="titulo">Preguntas frecuentes</h1>
        <ul className="lista">
          {preguntas.map((item, i) => (
            <li key={i} className="faq-item">
              <div className="header" onClick={() => togglePregunta(i)}>
                <span className="numero">{String(i + 1).padStart(2, "0")}</span>
                <span className="pregunta"><b>{item.pregunta}</b></span>
                <span className="simbolo">{abierta === i ? "−" : "+"}</span>
              </div>
              <div
                className={`contenido${abierta === i ? " contenido-abierto" : ""}`}
                style={{ maxHeight: abierta === i ? "200px" : "0px" }}
              >
                <ul>
                  {item.respuesta.map((r, j) => (
                    <li key={j} className="faq-linea">{r}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <Footer />
      </section>
    </>
  );
};

export default ComunidadUnificada;
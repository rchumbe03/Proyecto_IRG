import React, { useRef, useState } from 'react';
import '../cssusu/InicioComunidad.css';
import '../jsx/FormaParte.jsx'; // Asegúrate de que esta ruta sea correcta
import '../jsx/PreguntasFrecuentes.jsx'

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
  
  //se puede añadir mas comentarios
];

const InicioComunidad = () => {
  const [i, setI] = useState(0);
  const total = comentario.length;
  const containerRef = useRef(null);

  const prev = () => {
  if (!containerRef.current) return;
  const w = containerRef.current.clientWidth;

  const newIndex = i === 0 ? total - 1 : i - 1;

  setI(newIndex);

  containerRef.current.scrollTo({
    left: newIndex * w,
    behavior: 'smooth',
  });
};

const next = () => {
  if (!containerRef.current) return;
  const w = containerRef.current.clientWidth;
  
  const newIndex = i === total - 1 ? 0 : i + 1;

  setI(newIndex);

  containerRef.current.scrollTo({
    left: newIndex * w,
    behavior: 'smooth',
  });
};


  return (
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
  );
}

export default InicioComunidad;
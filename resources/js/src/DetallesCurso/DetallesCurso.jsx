import React, { useState } from 'react';
import '../DetallesCurso/DetallesCurso.css';
import Footer from '../components/Footer/Footer.jsx';

const DetallesCurso = () => {
  const [abierta, setAbierta] = useState(null);

  const togglePregunta = (index) => {
    setAbierta(abierta === index ? null : index);
  };

  const preguntas = [
    {
      pregunta: 'Fase de formación: Base',
      respuesta: ['En esta fase inicial del curso nos enfocaremos en construir una base sólida de conocimientos y habilidades fundamentales. Es crucial que los estudiantes comprendan los conceptos esenciales antes de avanzar a niveles más complejos. Durante esta etapa, se introducirá el contexto general del área de estudio, se presentarán los objetivos del curso y se abordarán los principios clave sobre los cuales se desarrollarán las siguientes unidades.'],
    },
    {
      pregunta: 'Fase de formación: Profesional',
      respuesta: ['Sí, al finalizar con éxito el curso.'],
    },
    {
      pregunta: 'Fase de formación: Avanzado',
      respuesta: ['Aproximadamente 8 semanas.'],
    },
    {
      pregunta: 'Fase de formación: Experto',
      respuesta: ['Sí, la plataforma es 100% responsive.'],
    },
  ];

  return (
    <div className="page-wrapper">
      <section className="contenido-curso">
        <h2 className="titulo">Contenido del curso</h2>
        <ul className="lista">
          {preguntas.map((item, i) => (
            <li key={i} className="faq-item">
              <div className="header" onClick={() => togglePregunta(i)}>
                <span className="pregunta">{item.pregunta}</span>
                <span className="simbolo">{abierta === i ? '-' : '+'}</span>
              </div>
              <div
                className={`contenido${abierta === i ? ' contenido-abierta' : ''}`}
                style={{ maxHeight: abierta === i ? '600px' : '0px' }}
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
      </section>
      <Footer />
    </div>
  );
};

export default DetallesCurso;

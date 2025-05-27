import React, { useEffect, useState } from 'react';
import '../cssusu/PreguntasFrecuentes.css';
import Footer from '../../components/Footer/Footer.jsx';


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

const PreguntasFrecuentes = () => {
  const [abierta, setAbierta] = useState(0);

  const togglePregunta = (idx) => {
    setAbierta(idx === abierta ? null : idx);
  };

  return (
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
  );
}
export default PreguntasFrecuentes;
import React, { useState, useEffect } from 'react';
import './Plataforma.css';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

const Plataforma = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Simulación: esto después lo vas a sacar de la base de datos del curso
  const [progreso, setProgreso] = useState(90); // Por ejemplo, 67%

  return (
    <div className={`plataforma-wrapper ${darkMode ? 'dark' : ''}`}>
      <HeaderPl />

      <div className="plataforma-container">
        <div className="plataforma-left">
          <button className="volver-btn">← Volver</button>
          <h1 className="titulo">¡Pasa al siguiente nivel!</h1>

          <div className="barras">
            {/* Barras grises estáticas (pueden ser decorativas) */}
            <div ><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, assumenda voluptatibus placeat optio quod adipisci nemo sequi labore, incidunt soluta vitae accusamus quia neque, perspiciatis iure quasi omnis porro ipsam.</h3></div>
            <div ><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, assumenda voluptatibus placeat optio quod adipisci nemo sequi labore, incidunt soluta vitae accusamus quia neque, perspiciatis iure quasi omnis porro ipsam.</h3></div>
            {/* Barra amarilla con ancho dinámico */}
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
          <img src="#" alt="Logo" className="logo-img" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Plataforma;

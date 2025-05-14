import React, { useState, useEffect } from 'react';
import './Plataforma.css';
import HeaderPl from '../Headers/jsx/HeaderPl.jsx';
import Footer from '../Footer.jsx';

const Plataforma = () => {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <div className={`plataforma-wrapper ${darkMode ? 'dark' : ''}`}>
      <HeaderPl />

      <div className="plataforma-container">
        <div className="plataforma-left">
          <button className="volver-btn">← Volver</button>
          <h1 className="titulo">¡Pasa al siguiente nivel!</h1>
          <div className="barras">
            <div className="barra gris"></div>
            <div className="barra gris"></div>
            <div className="barra gris"></div>
            <div className="barra gris"></div>
            <div className="barra amarilla"></div>
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

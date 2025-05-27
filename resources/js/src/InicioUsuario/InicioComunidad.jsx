import React, { useState, useEffect } from 'react';
import Header from '../components/Headers/jsx/HeaderPl.jsx';
import './InicioComunidad.css';
// import tecnoCasa from '../assets/imgs/tecnoCasa.png'; // IMAGEN

const InicioUsuario = () => {
    return (
        <div className="inicio-usuario">
            <Header />

            <div className="hero-section">
                <div className="hero-content">
                    <h1>Impulsa tu Éxito</h1>
                    <div className="descripcion-lineas">
                        <div className="linea"></div>
                        <div className="linea"></div>
                        <div className="linea corta"></div>
                    </div>
                    <button className="btn-entrar">Entrar</button>
                </div>

            </div>
        </div>
    );
};

export default InicioUsuario;

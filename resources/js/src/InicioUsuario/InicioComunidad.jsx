import React from 'react';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import './InicioComunidad.css';
import img from '../assets/img/98.png'; 
import { FaTv, FaBriefcase, FaStar } from 'react-icons/fa';

function InicioUsuario() {
  return (
    <>
      <HeaderPl />
      <main>
        {/* Hero Section */}
        <section
          className="hero-section"
          style={{
            background: `url(${img}) no-repeat center center`,
            backgroundSize: 'cover',
          }}
        >
          <div className="container">
            <h1>Impulsa tu Éxito</h1>
            <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p className="text-placeholder short"></p>
            <button className="btn">Entrar</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="features-list">
              <div className="feature">
                <FaTv className="feature-icon" />
                <h3>Entretenimiento</h3>
                <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p className="text-placeholder short"></p>
                <button className="btn">Saber más</button>
              </div>
              <div className="feature">
                <FaBriefcase className="feature-icon" />
                <h3>Trabajo</h3>
                <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p className="text-placeholder short"></p>
                <button className="btn">Saber más</button>
              </div>
              <div className="feature">
                <FaStar className="feature-icon" />
                <h3>Alta Calidad</h3>
                <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p className="text-placeholder short"></p>
                <button className="btn">Saber más</button>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <div className="container">
            <h2>Descubre nuestros programas</h2>
            <div className="courses-list">

              <div className="course-card">
                <img 
                  src={img} 
                  alt="Imagen Programa 1" 
                  className="course-image" 
                />
                <div className="course-content">
                  <h3>Programa 1</h3>
                  <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                  <p className="text-placeholder short"></p>
                  <button className="btn">Acceder</button>
                </div>
              </div>

              <div className="course-card">
                <img 
                  src={img}
                  alt="Imagen Programa 2" 
                  className="course-image" 
                />
                <div className="course-content">
                  <h3>Programa 2</h3>
                  <p className="text-placeholder long">Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                  <p className="text-placeholder short"></p>
                  <button className="btn">Acceder</button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default InicioUsuario;


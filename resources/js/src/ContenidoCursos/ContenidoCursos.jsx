import React, { useState } from 'react';
import './ContenidoCursos.css';
import HeaderAd from '../components/Headers/jsx/HeaderAd.jsx';
import { FaClock, FaDesktop, FaDownload } from 'react-icons/fa'; 



const CourseLandingPage = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);


  return (
    
    <div className="container dark-mode">
      <HeaderAd/>
      <div className="header-with-image">
        <div className="header-texts">
          <h1>Título del curso completo</h1>
          <h3>Más de 100 cursos completos</h3>

         <div className="phrase-container">
            <p>Parafo blablablablablablablablablablablablablablablablabla.</p>
            <div className="three-containers">
<div className="container-item">
        <FaClock className="icon-style" size={20} />
        <div className="container-text">10 semanas</div>
      </div>
      <div className="separator"></div> {/* Línea separadora */}

      <div className="container-item">
        <FaDesktop className="icon-style" size={20} />
        <div className="container-text">Presencial y virtual</div>
      </div>
      <div className="separator"></div> {/* Línea separadora */}

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
        <div className="header-image"> 
          <img src="data:image/jpeg;base64,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" alt="Apretón de manos con modelo de casa" />
          <div className='dinero'><h1>0,00$</h1></div>
          <div className="yellow-container">
            <p>comprar</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CourseLandingPage;

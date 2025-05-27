import React from 'react';
import '../cssusu/FormaParte.css';
import edificio from '../../assets/img/edificio.png';

const FormaParte = () => {
    return (
    <section className="contenedor">
      <h1 className="titulo">¿Que esperas para formar parte?</h1>
      <div className="seccion-contenido">
        <img src={edificio} alt="Invitación IRG" className="imagen-cont" />
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
  );
}

export default FormaParte;
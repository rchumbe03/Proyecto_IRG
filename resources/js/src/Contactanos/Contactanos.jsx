import React from "react";
import '../Contactanos/Contactanos.css'
import Header from '../components/Headers/jsx/HeaderPl.jsx'
import Footer from '../components/Footer/Footer.jsx'
import llamada from '../assets/logos/llamada.png'
import mensaje from '../assets/logos/mensaje.png'

const Contactanos = () =>{
    return(
        <>
        <Header/>
        <div className="contenedor-encabezado">
            <div className="dudas">
                <p>
                ¿Tienes dudas?
                </p>
            </div>
            <div className="subtitulo">
                <h2>Nos encantaría hablar contigo</h2>
            </div>
        </div>
        <div className="contenedor-contenido">
            
            <div className="consultas-sede">
                <div className="consultas">
                    <div className="informacion-consultas">
                        <p>Consulta más información</p>
                        <p className="enviar">Envianos tus consultas</p>
                    </div>
                    
                    <div className="correo-telefono">
                        <div className="logo-email">
                            <img src={mensaje} alt="logo de email" /> correo@correo.com
                        </div>
                        
                        <div className="logo-llamada">
                            <img src={llamada} alt="logo de llamada" /> +34 123 456 789
                        </div>
                    </div>
                </div>

                <div className="sede">
                    <div className="sede-1">
                        Sede 1
                        <p>Nuestros cursos están diseñados para adaptarse a tu ritmo de aprendizaje.
                        Incluyen recursos descargables, evaluaciones interactivas y seguimiento personalizado.
                        Al completarlos, obtendrás un certificado reconocido por la industria.
                        </p>
                    </div>
                    <div className="sede-2">
                        Sede 2
                        <p>Nuestros cursos están diseñados para adaptarse a tu ritmo de aprendizaje.
                        Incluyen recursos descargables, evaluaciones interactivas y seguimiento personalizado.
                        Al completarlos, obtendrás un certificado reconocido por la industria.
                        </p>
                    </div>
                    <div className="sede-3">
                        Sede 3
                        <p>Nuestros cursos están diseñados para adaptarse a tu ritmo de aprendizaje.
                        Incluyen recursos descargables, evaluaciones interactivas y seguimiento personalizado.
                        Al completarlos, obtendrás un certificado reconocido por la industria.
                        </p>
                    </div>
                </div>
            </div>

            <div className="formulario">
                <form className="formulario-contacto">
                    <fieldset>
                    <div className="campo-formulario">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Correo electronico" />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" />
                    </div>

                    <div className="campo-formulario">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" placeholder="Mensaje" rows="4"></textarea>
                    </div>

                    <button type="submit" className="boton-enviar">Enviar mensaje</button>
                    </fieldset>
                </form>
            </div>
        </div>
    <Footer/>
        </>
    );
}

export default Contactanos;
import React, { useEffect, useState } from "react";
import '../Perfil/Perfil.css'; // Estilos específicos para esta vista
import HeaderIn from '../components/Headers/jsx/HeaderIn.jsx'; // Encabezado personalizado
import Footer from '../components/Footer/Footer.jsx'; // Pie de página
import defaultAvatar from '../assets/avatars/avatarDefault.png'; // Imagen por defecto para el avatar
import axios from 'axios'; // Cliente HTTP para llamadas API
import { FaSave } from 'react-icons/fa'; // Icono de guardar

const Perfil = () => {
    return (
        <>
            <section className="contenedor-informacion-personal">
                <div className="informacion-personal">
                    <div className="cabecera-perfil">
                        <h1>Información personal</h1>
                            <button className="boton-guardar">
                                Guardar Cambios
                            </button>
                    </div>


                    <div className="contenedor-imagen">
                        <img src={defaultAvatar} alt="imagen de perfil" className="imagen-perfil" />
                        <p>Imagen de Perfil</p>
                    </div>

                    <div className="datos-personales">
                        <div className="dato-personal">
                            <label className="nombre-completo" htmlFor="nombre-completo">Nombre completo</label>
                            <input
                                className="barra-nombre-completo"
                                type="text"
                                id="nombre-completo"
                                name="nombre"
                                placeholder="Nombre y Apellido"
                            />
                        </div>

                        <div className="dato-email">
                            <label className="email" htmlFor="correo-electronico">Email</label>
                            <input
                                className="barra-email"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>

                        <div className="dato-direccion">
                            <h1>Dirección</h1>
                            <div className="grupo-direccion">
                                <div className="dato-line1">
                                    <label className="direccion" htmlFor="direccion">Dirección Línea 1</label>
                                    <input
                                        className="barra-direccion"
                                        type="text"
                                        id="direccion"
                                        name="direccionLinea1"
                                        placeholder="Dirección Línea 1"
                                    />
                                </div>

                            </div>

                            <div className="grupo-direccion2">
                                <div className="dato-pais">
                                    <label className="pais" htmlFor="Pais">País</label>
                                    <input
                                        className="barra-pais"
                                        type="text"
                                        id="pais"
                                        name="pais"
                                        placeholder="País"
                                    />
                                </div>

                                <div className="dato-ciudad">
                                    <label className="ciudad" htmlFor="ciudad">Ciudad</label>
                                    <input
                                        className="barra-ciudad"
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        placeholder="Ciudad"
                                    />
                                </div>
                            </div>

                            <div className="dato-pais2">
                                <label htmlFor="region">Estado / Región</label>
                                <input
                                    className="barra-pais2"
                                    type="text"
                                    id="region"
                                    name="region"
                                    placeholder="Estado / Región"
                                />
                                <input
                                    className="barra2-pais2"
                                    type="text"
                                    id="codigo-postal"
                                    name="codigoPostal"
                                    placeholder="Código postal"
                                />
                            </div>
                        </div>

                        <h1>Teléfono</h1>
                        <div className="grupo-telefono-cv">
                            <div className="dato-telefono">
                                <label htmlFor="telefono">Número de teléfono</label>
                                <div className="campo-telefono-completo">
                                    <select
                                        className="select-prefijo"
                                        id="prefijo"
                                        name="prefijo"
                                    >
                                        <option value="+34">ES +34 (España)</option>
                                        <option value="+44">GB +44 (Reino Unido)</option>
                                        <option value="+1">US +1 (EE.UU.)</option>
                                        <option value="+33">FR +33 (Francia)</option>
                                        <option value="+49">DE +49 (Alemania)</option>
                                        <option value="+52">MX +52 (México)</option>
                                        <option value="+51">PE +51 (Perú)</option>
                                        <option value="+54">AR +54 (Argentina)</option>
                                        <option value="+55">BR +55 (Brasil)</option>
                                        <option value="+593">EC +593 (Ecuador)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        className="input-telefono"
                                        placeholder="Número de teléfono"
                                    />
                                </div>
                            </div>

                                <div className="boton-cv">
                                    <button className="boton-cambios">
                                        Guardar Cambios
                                    </button>
                                </div>
                        </div>

                        <div className="dato-cv">
                            <label htmlFor="cv">CV</label>
                                <input
                                    type="text"
                                    id="cv"
                                    name="cv"
                                    placeholder="URL del CV"
                                    className="input-cv"
                                />                                    
                        </div>

                        <h1>Expediente</h1>
                        <div className="dato-expediente">
                            <div className="grupo-id-fase">
                                <div className="dato-id">
                                    <label htmlFor="id">ID</label>
                                    <input
                                        type="text"
                                        id="id"
                                        name="dni"
                                        placeholder="ID"
                                    />
                                </div>
                                <div className="dato-fase-actual">
                                    <label htmlFor="fase-actual">Fase Actual</label>
                                    <input
                                        type="text"
                                        id="fase-actual"
                                        placeholder="Fase Actual"
                                    />
                                </div>
                            </div>

                            <div className="grupo-progreso-tema">
                                <div className="dato-progreso">
                                    <label htmlFor="progreso">Progreso</label>
                                        <input
                                            type="number"
                                            id="progreso"
                                            name="progreso"
                                            placeholder="Progreso"
                                        />
                                </div>
                                <div className="dato-tema-actual">
                                    <label htmlFor="tema-actual">Tema Actual</label>
                                    <input
                                        type="text"
                                        id="tema-actual"
                                        placeholder="Tema Actual"
                                    />
                                </div>
                            </div>

                            <div className="grupo-tiempo-notas">
                                <div className="dato-tiempo">
                                    <label htmlFor="tiempo">Tiempo</label>
                                    <input
                                        type="text"
                                        id="tiempo"
                                        placeholder="Tiempo"
                                    />
                                </div>
                                <div className="dato-notas">
                                    <label htmlFor="notas">Notas</label>
                                    <input
                                        type="text"
                                        id="notas"
                                        placeholder="Notas"
                                    />
                                </div>
                            </div>

                            <div className="grupo-jornadas-cuenta">
                                <div className="dato-jornadas">
                                    <label htmlFor="jornadas-realizadas">Jornadas Realizadas</label>
                                    <input
                                        type="text"
                                        id="jornadas-realizadas"
                                        placeholder="Jornada Realizadas"
                                    />
                                </div>
                                <div className="dato-cuenta">
                                    <label htmlFor="cuenta-creada">Cuenta creada</label>
                                    <input
                                        type="text"
                                        id="cuenta-creada"
                                        placeholder="Cuenta creada"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Perfil;

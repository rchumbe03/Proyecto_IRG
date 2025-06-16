import React, { useEffect, useState } from "react";
import '../InformacionPersonal/InformacionPersonal.css';
import HeaderIn from '../components/Headers/jsx/HeaderIn.jsx';
import Footer from '../components/Footer/Footer.jsx';
import defaultAvatar from '../assets/avatars/avatarDefault.png';
import axios from 'axios';

const InformacionPersonal = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    axios.get('/api/user/perfil', { withCredentials: true }) // Importante: con credenciales si usas auth.cookie
        .then(res => setUserData(res.data))
        .catch(err => {
            console.error("Error obteniendo usuario:", err);
            // Esto es opcional: datos de prueba si falla la API
            setUserData({
                nombre: "Usuario Test",
                email: "usuario@test.com",
                direccion: "Dirección Ejemplo",
                telefono: "123456789",
                cv: "",
                dni: "12345678X",
                foto_perfil: null,
            });
        });
}, []);


    // Render hasta que cargue el usuario
    if (!userData) return <div>Cargando...</div>;

    return (
        <>
            <HeaderIn />
            <section className="contenedor-informacion-personal">
                <div className="informacion-personal">
                    <div className="cabecera-perfil">
                        <h1>Información personal</h1>
                        <button className="boton-guardar">Guardar Cambios</button>
                        <button className="boton-editar">Editar Perfil</button>
                    </div>

                    <div className="contenedor-imagen">
                        <img
                            src={userData.foto_perfil ? userData.foto_perfil : defaultAvatar}
                            alt="imagen de perfil"
                            className="imagen-perfil"
                        />
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
                                value={userData.nombre || ""}
                                readOnly
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
                                value={userData.email || ""}
                                readOnly
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
                                        value={userData.direccion ? userData.direccion.split("\n")[0] : ""}
                                        readOnly
                                    />
                                </div>
                                <div className="dato-suit">
                                    <label className="suit" htmlFor="Apt">Apt, Suit</label>
                                    <input
                                        className="barra-suit"
                                        type="text"
                                        id="apt"
                                        name="apt"
                                        placeholder="Apt, Suit"
                                        value={userData.direccion ? (userData.direccion.split("\n")[1] || "") : ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* Puedes agregar más campos separados si tienes país, ciudad, etc. en la base */}
                        </div>
                        <h1>Teléfono</h1>
                        <div className="grupo-telefono-cv">
                            <div className="dato-telefono">
                                <label htmlFor="telefono">Número de teléfono</label>
                                <div className="campo-telefono-completo">
                                    <select className="select-prefijo" id="prefijo" name="prefijo" disabled>
                                        <option value="">Selecciona</option>
                                    </select>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        className="input-telefono"
                                        placeholder="Número de teléfono"
                                        value={userData.telefono || ""}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="boton-cv">
                                <button className="boton-cambios">Guardar Cambios</button>
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
                                value={userData.cv || ""}
                                readOnly
                            />
                            {userData.cv ? (
                                <a
                                    href={userData.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="enlace-cv"
                                >
                                    Ver CV
                                </a>
                            ) : (
                                <span className="sin-cv">No hay CV cargado</span>
                            )}
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
                                        value={userData.dni || ""}
                                        readOnly
                                    />
                                </div>
                                <div className="dato-fase-actual">
                                    <label htmlFor="fase-actual">Fase Actual</label>
                                    <input
                                        type="text"
                                        id="fase-actual"
                                        placeholder="Fase Actual"
                                        value="" // Aquí pon lo que tengas en la base
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* El resto igual, rellena value con lo que tengas de la base */}
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
}

export default InformacionPersonal;

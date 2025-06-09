import React, { useEffect, useState } from "react";
import '../InformacionPersonal/InformacionPersonal.css'; // Estilos específicos para esta vista
import HeaderIn from '../components/Headers/jsx/HeaderIn.jsx'; // Encabezado personalizado
import Footer from '../components/Footer/Footer.jsx'; // Pie de página
import defaultAvatar from '../assets/avatars/avatarDefault.png'; // Imagen por defecto para el avatar
import axios from 'axios'; // Cliente HTTP para llamadas API
import { FaSave } from 'react-icons/fa'; // Icono de guardar

const InformacionPersonal = () => {
    // Estados para almacenar datos del usuario, modo de edición, formulario, carga y errores
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccionLinea1: '',
        apt: '',
        pais: 'España',
        ciudad: '',
        region: '',
        codigoPostal: '',
        telefono: '',
        prefijo: '+34',
        dni: '',
        progreso: '',
        cv: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configuración base para las solicitudes Axios
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    // Función para obtener el token CSRF antes de hacer solicitudes seguras al backend
    const getCsrfToken = async () => {
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true
            });
        } catch (error) {
            console.error('Error al obtener token CSRF:', error);
            setError('Error de autenticación');
        }
    };

    // Obtener los datos del usuario desde la API y actualizar el estado
    const fetchUserData = async () => {
        try {
            await getCsrfToken();

            const response = await axios.get(
                'http://localhost:8000/api/perfil-usuario',
                config
            );

            if (response.data) {
                const parsedData = parseUserData(response.data); // Procesar datos
                setUserData(response.data); // Guardar en estado original
                setFormData(parsedData); // Guardar en estado editable
                setError(null);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setError('Error al cargar información del usuario');
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    // Función para dividir y organizar los datos del usuario
    const parseUserData = (data) => {
        if (!data) return formData;

        // Procesar dirección (asumiendo formato: "dirección apt ciudad región país código postal")
        const addressParts = data.direction ? data.direction.split(' ') : [];
        const postalCode = addressParts.pop() || '';
        const country = addressParts.pop() || 'España';
        const region = addressParts.pop() || '';
        const city = addressParts.pop() || '';
        const apt = addressParts.pop() || '';
        const addressLine1 = addressParts.join(' ') || '';

        // Procesar teléfono
        const rawPhone = data.telefono || '';
        let phonePrefix = '+34';
        let phoneNumber = rawPhone.replace(/\D/g, '');

        if (rawPhone.includes('+')) {
            phonePrefix = rawPhone.substring(0, rawPhone.indexOf(' ') || rawPhone.length);
            phoneNumber = rawPhone.replace(phonePrefix, '').trim();
        }

        return {
            nombre: data.nombre || '',
            email: data.email || '',
            direccionLinea1: addressLine1,
            apt: apt,
            pais: country,
            ciudad: city,
            region: region,
            codigoPostal: postalCode,
            telefono: phoneNumber,
            prefijo: phonePrefix,
            dni: data.dni || '',
            progreso: data.edad ? Math.min(100, parseInt(data.edad) * 2) : 0,
            cv: data.cv || ''
        };
    };

    // Maneja los cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Guarda los cambios del formulario al backend
    const handleSave = async () => {
        try {
            await getCsrfToken();

            // Reconstruir datos para la base de datos
            const updatedData = {
                nombre: formData.nombre,
                direction: `${formData.direccionLinea1} ${formData.apt} ${formData.ciudad} ${formData.region} ${formData.pais} ${formData.codigoPostal}`,
                telefono: `${formData.prefijo} ${formData.telefono}`,
                dni: formData.dni,
                edad: Math.round(formData.progreso / 2).toString(),
                cv: formData.cv
            };

            const response = await axios.put(
                'http://localhost:8000/api/perfil-usuario',
                updatedData,
                config
            );

            if (response.data) {
                setUserData(response.data); // Actualizar datos del usuario
                setEditMode(false); // Salir del modo edición
                setError(null); // Limpiar errores
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            setError('Error al guardar cambios');
        }
    };

    // Ejecutar fetch al montar el componente
    useEffect(() => {
        fetchUserData();
    }, []);

    // Mostrar pantalla de carga
    if (loading) {
        return <div className="contenedor-carga"><p>Cargando información personal...</p></div>;
    }

    // Aquí continúa la renderización del JSX del componente (omitido para brevedad)


    return (
        <>
            <HeaderIn />
            <section className="contenedor-informacion-personal">
                <div className="informacion-personal">
                    <div className="cabecera-perfil">
                        <h1>Información personal</h1>
                        {editMode ? (
                            <button className="boton-guardar" onClick={handleSave}>
                                <FaSave /> Guardar Cambios
                            </button>
                        ) : (
                            <button className="boton-editar" onClick={() => setEditMode(true)}>
                                Editar Perfil
                            </button>
                        )}
                    </div>

                    {error && <div className="error-mensaje">{error}</div>}

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
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Nombre y Apellido"
                                readOnly={!editMode}
                            />
                        </div>

                        <div className="dato-email">
                            <label className="email" htmlFor="correo-electronico">Email</label>
                            <input
                                className="barra-email"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
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
                                        value={formData.direccionLinea1}
                                        onChange={handleInputChange}
                                        placeholder="Dirección Línea 1"
                                        readOnly={!editMode}
                                    />
                                </div>

                                <div className="dato-suit">
                                    <label className="suit" htmlFor="Apt">Apt, Suit</label>
                                    <input
                                        className="barra-suit"
                                        type="text"
                                        id="apt"
                                        name="apt"
                                        value={formData.apt}
                                        onChange={handleInputChange}
                                        placeholder="Apt, Suit"
                                        readOnly={!editMode}
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
                                        value={formData.pais}
                                        onChange={handleInputChange}
                                        placeholder="País"
                                        readOnly={!editMode}
                                    />
                                </div>

                                <div className="dato-ciudad">
                                    <label className="ciudad" htmlFor="ciudad">Ciudad</label>
                                    <input
                                        className="barra-ciudad"
                                        type="text"
                                        id="ciudad"
                                        name="ciudad"
                                        value={formData.ciudad}
                                        onChange={handleInputChange}
                                        placeholder="Ciudad"
                                        readOnly={!editMode}
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
                                    value={formData.region}
                                    onChange={handleInputChange}
                                    placeholder="Estado / Región"
                                    readOnly={!editMode}
                                />
                                <input
                                    className="barra2-pais2"
                                    type="text"
                                    id="codigo-postal"
                                    name="codigoPostal"
                                    value={formData.codigoPostal}
                                    onChange={handleInputChange}
                                    placeholder="Código postal"
                                    readOnly={!editMode}
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
                                        value={formData.prefijo}
                                        onChange={handleInputChange}
                                        disabled={!editMode}
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
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        placeholder="Número de teléfono"
                                        readOnly={!editMode}
                                    />
                                </div>
                            </div>

                            {editMode && (
                                <div className="boton-cv">
                                    <button className="boton-cambios" onClick={handleSave}>
                                        Guardar Cambios
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="dato-cv">
                            <label htmlFor="cv">CV</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    id="cv"
                                    name="cv"
                                    value={formData.cv}
                                    onChange={handleInputChange}
                                    placeholder="URL del CV"
                                    className="input-cv"
                                />
                            ) : formData.cv ? (
                                <a
                                    href={formData.cv}
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
                                        value={formData.dni}
                                        onChange={handleInputChange}
                                        placeholder="ID"
                                        readOnly={!editMode}
                                    />
                                </div>
                                <div className="dato-fase-actual">
                                    <label htmlFor="fase-actual">Fase Actual</label>
                                    <input
                                        type="text"
                                        id="fase-actual"
                                        placeholder="Fase Actual"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="grupo-progreso-tema">
                                <div className="dato-progreso">
                                    <label htmlFor="progreso">Progreso</label>
                                    {editMode ? (
                                        <input
                                            type="number"
                                            id="progreso"
                                            name="progreso"
                                            value={formData.progreso}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="100"
                                            placeholder="Progreso"
                                        />
                                    ) : (
                                        <div className="barra-progreso">
                                            <div
                                                className="relleno-progreso"
                                                style={{ width: `${formData.progreso}%` }}
                                            ></div>
                                            <span>{formData.progreso}%</span>
                                        </div>
                                    )}
                                </div>
                                <div className="dato-tema-actual">
                                    <label htmlFor="tema-actual">Tema Actual</label>
                                    <input
                                        type="text"
                                        id="tema-actual"
                                        placeholder="Tema Actual"
                                        readOnly
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
                                        readOnly
                                    />
                                </div>
                                <div className="dato-notas">
                                    <label htmlFor="notas">Notas</label>
                                    <input
                                        type="text"
                                        id="notas"
                                        placeholder="Notas"
                                        readOnly
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
                                        readOnly
                                    />
                                </div>
                                <div className="dato-cuenta">
                                    <label htmlFor="cuenta-creada">Cuenta creada</label>
                                    <input
                                        type="text"
                                        id="cuenta-creada"
                                        placeholder="Cuenta creada"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
}

export default Perfil;

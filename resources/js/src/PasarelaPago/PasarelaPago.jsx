import React, { useState } from 'react';
import HeaderPl from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';
import './PasarelaPago.css';

function PasarelaPago() {
    const [formData, setFormData] = useState({
        email: '',
        nombreApellido: '',
        contrasena: '',
        confirmarContrasena: '',
        direccion: '',
        apt: '',
        ciudad: '',
        pais: '',
        estado: '',
        codigoPostal: '',
        telefono: '',
        tarjeta: '',
        repetirTarjeta: '',
        mes: '',
        anio: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
    };

    return (
        <div>
            <HeaderPl />

            <main className="pasarela-container">
                <form className="pasarela-form" onSubmit={handleSubmit}>
                    {/* Columna izquierda - Datos personales */}
                    <div className="columna">
                        <div className="pasarela-input">
                            <input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="nombreApellido" placeholder="Nombre y Apellido" value={formData.nombreApellido} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="contrasena" type="password" placeholder="Crear contraseña" value={formData.contrasena} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="confirmarContrasena" type="password" placeholder="Confirmar contraseña" value={formData.confirmarContrasena} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="direccion" placeholder="Dirección Línea 1" value={formData.direccion} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="apt" placeholder="Apt, Suite" value={formData.apt} onChange={handleChange} />
                        </div>
                        <div className="pasarela-input">
                            <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="pais" placeholder="País" value={formData.pais} onChange={handleChange} required />
                        </div>
                        <div className="input-row">
                            <input name="estado" placeholder="Estado / Región" value={formData.estado} onChange={handleChange} required />
                            <input name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="telefono" placeholder="Número de teléfono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Columna derecha - Datos de pago */}
                    <div className="columna">
                        <div className="pasarela-input">
                            <input name="tarjeta" placeholder="Número de tarjeta" value={formData.tarjeta} onChange={handleChange} required />
                        </div>
                        <div className="pasarela-input">
                            <input name="repetirTarjeta" placeholder="Confirmar número de tarjeta" value={formData.repetirTarjeta} onChange={handleChange} required />
                        </div>
                        <div className="input-row">
                            <input name="mes" placeholder="Mes" value={formData.mes} onChange={handleChange} required />
                            <input name="anio" placeholder="Año" value={formData.anio} onChange={handleChange} required />
                            <input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                        </div>

                        <div className="detalles-compra">
                            <h3 className="detalles-compra-title">Detalles de la compra</h3>
                            <div className="barra-progreso">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
                            <div className="detalles-compra-item">
                                <span className="tooltip">?</span>
                                <span className="iva-label">IVA</span>
                                <div className="detalles-compra-total">
                                <div className="detalles-compra-total">
                                <div className="total-label">Total a pagar</div>
                                <div className="total-valor">0.00€</div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="pagar-btn">Pagar</button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}

export default PasarelaPago;

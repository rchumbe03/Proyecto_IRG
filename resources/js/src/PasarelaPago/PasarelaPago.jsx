import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Headers/jsx/HeaderPl.jsx';
import Footer from '../components/Footer/Footer.jsx';
import './PasarelaPago.css';

const stripePromise = loadStripe('pk_test_51RGlsjB2ttGnV711RTjFq0AoULWgpTuCeOLL4W0rsi6UTCx7TI85kOW0KIwMN0vHIgrgfVuxDb0t1hbyZjNd2sWd00je0sxh6D');

// Componente reutilizable para los campos de entrada
function InputField({ label, name, type = "text", value, onChange, required = true, placeholder, children }) {
    return (
        <div className="pasarela-input" style={{ position: 'relative' }}>
            {label && <label className="titulo">{label}</label>}
            <input
                name={name}
                type={type}
                placeholder={placeholder || label}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete="off"
            />
            {children}
        </div>
    );
}

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [prefijo, setPrefijo] = useState('+34'); // Por defecto España
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        nombreApellido: '',
        contrasena: '',
        confirmarContrasena: '',
        direccion: '',
        ciudad: '',
        pais: '',
        estado: '',
        codigoPostal: '',
        telefono: '',
    });

    const isFormValid = Object.values(formData).every(val => val.trim() !== '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:5173/confirmacion-pago',
                payment_method_data: {
                    billing_details: {
                        address: {
                            city: formData.ciudad,
                            country: formData.pais,
                            line1: formData.direccion,
                            postal_code: formData.codigoPostal,
                            state: formData.estado,
                        },
                        name: formData.nombreApellido,
                        email: formData.email,
                        phone: formData.telefono,
                    }
                }
            }
        });

        if (error) {
            console.error('Error en el pago:', error.message);
        } else {
            console.log('Pago exitoso');
        }
        setLoading(false);
    };

    return (
        <div>
            <Header />
            <main className="pasarela-container">
                <form className="pasarela-form" onSubmit={handleSubmit}>
                    {/* Columna izquierda - Datos personales y dirección */}
                    <div className="columna">
                        <h2 className="pasarela-title">Datos personales</h2>
                        <InputField
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                        />
                        <InputField
                            label="Nombre y Apellido"
                            name="nombreApellido"
                            value={formData.nombreApellido}
                            onChange={handleChange}
                            placeholder="Nombre y Apellido"
                        />
                        <InputField
                            label="Contraseña"
                            name="contrasena"
                            type={mostrarContrasena ? "text" : "password"}
                            value={formData.contrasena}
                            onChange={handleChange}
                            placeholder="Crear contraseña"
                        >
                            <button
                                type="button"
                                className="icon-button"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                <FontAwesomeIcon icon={mostrarContrasena ? faEyeSlash : faEye} />
                            </button>
                        </InputField>

                        <InputField
                            label="Confirmar Contraseña"
                            name="confirmarContrasena"
                            type={mostrarConfirmar ? "text" : "password"}
                            value={formData.confirmarContrasena}
                            onChange={handleChange}
                            placeholder="Confirmar contraseña"
                        >
                            <button
                                type="button"
                                className="icon-button"
                                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                                aria-label={mostrarConfirmar ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                <FontAwesomeIcon icon={mostrarConfirmar ? faEyeSlash : faEye} />
                            </button>
                        </InputField>
                        <h3 className="pasarela-title" style={{marginTop: '1rem'}}>Dirección de facturación</h3>
                        <InputField
                            label="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                        />
                        <div className="input-row">
                            <InputField
                                label="Ciudad"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                placeholder="Ciudad"
                            />
                            <InputField
                                label="Código Postal"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
                                placeholder="Código Postal"
                            />
                        </div>
                        <div className="input-row">
                            <InputField
                                label="País"
                                name="pais"
                                value={formData.pais}
                                onChange={handleChange}
                                placeholder="País"
                            />
                            <InputField
                                label="Estado/Provincia"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                placeholder="Estado/Provincia"
                            />
                        </div>
                        <div className="pasarela-input telefono-row">
                            <label className="titulo">Teléfono</label>
                            <div className="telefono-input-container">
                                <select
                                    name="prefijo"
                                    value={prefijo}
                                    onChange={e => setPrefijo(e.target.value)}
                                    className="telefono-prefijo"
                                    required
                                >
                                    <option value="+34">+34</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+33">+33</option>
                                </select>
                                <input
                                    name="telefono"
                                    type="tel"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Número de teléfono"
                                    className="telefono-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Datos de pago */}
                    <div className="columna">
                        <h2 className="pasarela-title">Datos de compra</h2>
                        <div id="payment-element-container">
                            <label className="titulo">Método de pago</label>
                            <PaymentElement id="payment-element" />
                            <div className="detalles-compra">
                                <div className="detalles-compra-title">Resumen de compra</div>
                                <div className="detalles-compra-item">
                                    <span>Producto:</span>
                                    <span>Curso React</span>
                                </div>
                                <div className="detalles-compra-item">
                                    <span>Subtotal:</span>
                                    <span>€20.00</span>
                                </div>
                                <div className="detalles-compra-item">
                                    <span className="iva-label">IVA (21%):</span>
                                    <span>€4.20</span>
                                </div>
                                <div className="detalles-compra-total">
                                    <span>Total:</span>
                                    <span>€24.20</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`pagar-btn${isFormValid && !loading ? ' enabled' : ''}`}
                                disabled={!stripe || loading || !isFormValid}
                            >
                                {loading ? 'Procesando...' : 'Pagar'}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default function PasarelaPago() {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'John Doe',
                phone: '123456789',
                country: 'España',
                product_name: 'Curso React',
                amount: 2000,
            }),
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimaryText: '#262626',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                <PaymentForm />
            </Elements>
        ) : (
            <div>Cargando...</div>
        )
    );
}

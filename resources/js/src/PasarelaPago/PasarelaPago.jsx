import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Headers/jsx/HeaderIn.jsx';
import Footer from '../components/Footer/Footer.jsx';
import './PasarelaPago.css';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51RGlsjB2ttGnV711RTjFq0AoULWgpTuCeOLL4W0rsi6UTCx7TI85kOW0KIwMN0vHIgrgfVuxDb0t1hbyZjNd2sWd00je0sxh6D');

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
    const [prefijo, setPrefijo] = useState('+34');
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
        edad: '',
        dni: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombreApellido':
                if (/[^a-zA-Z\s]/.test(value)) {
                    error = 'El nombre no debe contener números ni símbolos.';
                }
                break;
            case 'email':
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    error = 'El correo electrónico debe ser válido.';
                }
                break;
            case 'edad':
                if (!/^\d+$/.test(value)) {
                    error = 'La edad debe ser solo números.';
                } else if (value.length > 3) {
                    error = 'La edad no puede tener más de 3 caracteres.';
                }
                break;
            case 'dni':
                if (!/^[a-zA-Z0-9]{9}$/.test(value)) {
                    error = 'El DNI debe tener exactamente 9 caracteres.';
                }
                break;
            case 'codigoPostal':
                if (!/^\d{5}$/.test(value)) {
                    error = 'El código postal debe tener exactamente 5 dígitos.';
                }
                break;
            case 'direccion':
                if (value.trim() === '') {
                    error = 'La dirección no puede estar vacía.';
                }
                break;
            case 'ciudad':
                if (value.trim() === '') {
                    error = 'La ciudad no puede estar vacía.';
                }
                break;
            case 'pais':
                if (value.trim() === '') {
                    error = 'El país no puede estar vacío.';
                }
                break;
            case 'estado':
                if (value.trim() === '') {
                    error = 'El estado no puede estar vacío.';
                }
                break;
            case 'telefono':
                if (!/^\d{7,15}$/.test(value)) {
                    error = 'El número de teléfono debe contener entre 7 y 15 dígitos.';
                }
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const isFormValid = Object.values(formData).every(val => val.trim() !== '') &&
        Object.values(errors).every(err => err === '') &&
        formData.contrasena === formData.confirmarContrasena;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !isFormValid) return;
        setLoading(true);

        try {
            await axios.post('/api/guardar-datos-pago', {
                nombre: formData.nombreApellido,
                email: formData.email,
                password: formData.contrasena,
                direccion: formData.direccion,
                ciudad: formData.ciudad,
                pais: formData.pais,
                estado: formData.estado,
                codigo_postal: formData.codigoPostal,
                prefijo_telefono: prefijo,
                telefono: formData.telefono,
                edad: formData.edad,
                dni: formData.dni,
            });

            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:8000/login',
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
                            phone: `${prefijo}${formData.telefono}`,
                        }
                    }
                }
            });

            if (error) {
                console.error('Error en el pago:', error.message);
            } else {
                console.log('Pago exitoso');
            }
        } catch (err) {
            console.error('Error al guardar datos o procesar el pago:', err.message);
        }

        setLoading(false);
    };

    return (
        <div>
            <Header />
            <main className="pasarela-container">
                <form className="pasarela-form" onSubmit={handleSubmit}>
                    <div className="columna">
                        <h2 className="pasarela-title">Datos personales</h2>
                        <InputField
                            label="Nombre y Apellido"
                            name="nombreApellido"
                            value={formData.nombreApellido}
                            onChange={handleChange}
                            placeholder="Nombre y Apellido"
                        />
                        {errors.nombreApellido && <p className="error-message">{errors.nombreApellido}</p>}
                        <InputField
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
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
                        {formData.contrasena !== formData.confirmarContrasena && (
                            <p className="error-message">Las contraseñas no coinciden.</p>
                        )}
                        <div className="edad-dni-input-container">
                            <div className="pasarela-input" style={{ width: '20%' }}>
                                <label className="titulo">Edad</label>
                                <input
                                    name="edad"
                                    type="number"
                                    value={formData.edad}
                                    onChange={handleChange}
                                    placeholder="Edad"
                                />
                                {errors.edad && <p className="error-message">{errors.edad}</p>}
                            </div>
                            <div className="pasarela-input" style={{ width: '80%' }}>
                                <label className="titulo">DNI</label>
                                <input
                                    name="dni"
                                    type="text"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="DNI"
                                />
                                {errors.dni && <p className="error-message">{errors.dni}</p>}
                            </div>
                        </div>
                        <InputField
                            label="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                        />
                        {errors.direccion && <p className="error-message">{errors.direccion}</p>}
                        <div className="input-row">
                            <div className="pasarela-input">
                                <label className="titulo">Ciudad</label>
                                <input
                                    name="ciudad"
                                    type="text"
                                    value={formData.ciudad}
                                    onChange={handleChange}
                                    placeholder="Ciudad"
                                />
                                {errors.ciudad && <p className="error-message">{errors.ciudad}</p>}
                            </div>
                            <div className="pasarela-input">
                                <label className="titulo">Código Postal</label>
                                <input
                                    name="codigoPostal"
                                    type="text"
                                    value={formData.codigoPostal}
                                    onChange={handleChange}
                                    placeholder="Código Postal"
                                />
                                {errors.codigoPostal && <p className="error-message">{errors.codigoPostal}</p>}
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="pasarela-input">
                                <label className="titulo">País</label>
                                <input
                                    name="pais"
                                    type="text"
                                    value={formData.pais}
                                    onChange={handleChange}
                                    placeholder="País"
                                />
                                {errors.pais && <p className="error-message">{errors.pais}</p>}
                            </div>
                            <div className="pasarela-input">
                                <label className="titulo">Estado/Provincia</label>
                                <input
                                    name="estado"
                                    type="text"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    placeholder="Estado/Provincia"
                                />
                                {errors.estado && <p className="error-message">{errors.estado}</p>}
                            </div>
                        </div>
                        <div className="telefono-row">
                            <label className="titulo">Teléfono</label>
                            <div className="telefono-input-container">
                                <select
                                    className="telefono-prefijo"
                                    value={prefijo}
                                    onChange={(e) => setPrefijo(e.target.value)}
                                >
                                    <option value="+34">+34</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <input
                                    className="telefono-input"
                                    name="telefono"
                                    type="text"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Número de teléfono"
                                />
                            </div>
                            {errors.telefono && <p className="error-message">{errors.telefono}</p>}
                        </div>
                    </div>
                    <div className="columna">
                        <h2 className="pasarela-title">Datos de compra</h2>
                        <div id="payment-element-container">
                            <label className="titulo">Metodo de pago</label>
                            <PaymentElement id="payment-element" />
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
                amount: 100,
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

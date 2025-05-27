import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Header from '../components/Headers/jsx/HeaderIn.jsx';
import Footer from '../components/Footer/Footer.jsx';
import './PasarelaPago.css';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Reemplaza con tu clave pública de Stripe

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        nombreApellido: '',
        direccion: '',
        ciudad: '',
        pais: '',
        estado: '',
        codigoPostal: '',
    });

    useEffect(() => {
        // Solicita el clientSecret al backend
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 2000, id_usuario: 1, id_curso: 1 }), // Ajusta los datos según tu lógica
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error('CardElement no encontrado');
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: formData.nombreApellido,
                    email: formData.email,
                    address: {
                        line1: formData.direccion,
                        city: formData.ciudad,
                        state: formData.estado,
                        postal_code: formData.codigoPostal,
                        country: formData.pais,
                    },
                },
            },
        });

        if (error) {
            console.error('Error en el pago:', error.message);
        } else if (paymentIntent.status === 'succeeded') {
            console.log('Pago exitoso:', paymentIntent);
        }
    };

    return (
        <div>
            <Header />

            <main className="pasarela-container">
                <form className="pasarela-form" onSubmit={handleSubmit}>
                    {/* Columna izquierda - Datos personales */}
                    <div className="columna">
                        <h2 className="pasarela-title">Datos personales</h2>
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
                        <h2 className="pasarela-title">Datos de compra</h2>
                        <CardElement className="stripe-card-element" />

                        <div className="detalles-compra">
                            <h3 className="detalles-compra-title">Detalles de la compra</h3>
                            <div className="barra-de-progreso"></div>
                            <div className="detalles-compra-item">
                                <span className="tooltip">?</span>
                                <span className="iva-label">IVA</span>
                                <div className="detalles-compra-total">
                                    <span>Total a pagar</span>
                                    <span>0.00€</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="pagar-btn" disabled={!stripe || !elements}>Pagar</button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}

export default function PasarelaPago() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}

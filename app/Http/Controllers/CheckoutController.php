<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        // Configura la clave de API de Stripe
        Stripe::setApiKey(env('STRIPE_SK'));

        // Crea un PaymentIntent
        $paymentIntent = PaymentIntent::create([
            'amount' => $request->input('amount'), // Monto en centavos
            'currency' => 'eur', // Cambia a la moneda que necesites
            'payment_method_types' => ['card', 'google_pay', 'paypal'], // Tipos de métodos de pago permitidos
            'metadata' => [
                'id_usuario' => $request->input('id_usuario'), // Asegúrate de enviar el id_usuario desde el frontend
                'id_curso' => $request->input('id_curso'), // Asegúrate de enviar el id_curso desde el frontend
            ]
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret, // Devuelve el client secret al frontend
        ]);
    }

    public function handleWebhook(Request $request)
    {
        // Manejo de eventos de Stripe (webhooks)
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $endpointSecret
            );

            // Maneja el evento según su tipo
            if ($event->type === 'payment_intent.succeeded') {
                $paymentIntent = $event->data->object; // Logica para manejar el pago exitoso

                // Guarda la información del pago en tu base de datos
                \App\Models\Compra::create([
                    'id_usuario' => $paymentIntent->metadata->id_usuario, // Asegúrate de enviar el id_usuario en los metadatos
                    'id_curso' => $paymentIntent->metadata->id_curso, // Asegúrate de enviar el id_curso en los metadatos
                    'precio' => $paymentIntent->amount / 100, // Convierte de centavos a euros
                    'metodo_pago' => 'stripe',
                ]);
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}

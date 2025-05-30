<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        // Validar los datos de entrada
        $validatedData = $request->validate([
            'amount' => 'required|integer|min:1', // Monto en centavos
        ]);

        try {
            // Configurar Stripe con la clave secreta
            Stripe::setApiKey(config('stripe.sk'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $validatedData['amount'],
                'currency' => 'eur',
                'payment_method_types' => ['card', 'paypal'],
            ]);

            return response()->json(['clientSecret' => $paymentIntent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function confirmPayment()
    {
        return response()->json(['message' => 'Pago confirmado exitosamente.']);
    }

    public function cancelPayment()
    {
        return response()->json(['message' => 'Pago cancelado.']);
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar campos requeridos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Buscar admin por email
        $admin = Admin::where('email', $request->email)->first();


        // Verificar si el admin existe y la contraseña es correcta
        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales inválidas',
            ], 401);
        }

        // Autenticación exitosa (puedes generar token si usas sanctum o passport)
        return response()->json([
            'success' => true,
            'message' => 'Login exitoso',
            'admin' => $admin,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente',
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => [
                'required',
                Password::min(8)->mixedCase()->letters()->numbers()->symbols(),
            ],
        ]);

        // 🔍 Buscar en admins
        $admin = Admin::where('email', $request->email)->first();
        if ($admin && Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => true,
                'message' => 'Login exitoso como admin',
                'tipo' => 'admin',
                'data' => $admin,
            ]);
        }

        // 🔍 Buscar en usuarios
        $usuario = Usuario::where('email', $request->email)->first();
        if ($usuario && Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'success' => true,
                'message' => 'Login exitoso como usuario',
                'tipo' => 'usuario',
                'data' => $usuario,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Credenciales inválidas',
        ], 401);
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

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Primero buscar en la tabla de administradores
            $admin = Admin::where('email', $credentials['email'])->first();

            if ($admin && Hash::check($credentials['password'], $admin->password)) {
                $token = $admin->createToken('auth-token')->plainTextToken;

                $userData = [
                    'id' => $admin->id,
                    'nombre' => $admin->nombre,
                    'email' => $admin->email,
                    'type' => 'admin',
                    'theme' => 'light'
                ];

                return $this->createSuccessResponse($userData, $token);
            }

            // Si no es admin, buscar en la tabla de usuarios
            $usuario = Usuario::where('email', $credentials['email'])->first();

            if ($usuario && Hash::check($credentials['password'], $usuario->password)) {
                $token = $usuario->createToken('auth-token')->plainTextToken;

                $userData = [
                    'id' => $usuario->id,
                    'nombre' => $usuario->nombre,
                    'email' => $usuario->email,
                    'type' => 'user',
                    'theme' => 'light'
                ];

                return $this->createSuccessResponse($userData, $token);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales inválidas'
            ], 401);

        } catch (\Exception $e) {
            Log::error('Error en login: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Error del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    private function createSuccessResponse($userData, $token)
    {
        $authCookie = cookie('auth_token', $token, 60 * 24, null, null, false, true);
        $userCookie = cookie('user_data', json_encode($userData), 60 * 24, null, null, false, true);

        return response()->json([
            'status' => 'success',
            'user' => $userData,
            'token' => $token // Añadimos el token en la respuesta para debug
        ])->withCookie($authCookie)
            ->withCookie($userCookie);
    }

    public function logout(Request $request)
    {
        $token = $request->cookie('auth_token');
        if ($token) {
            // Revocar el token actual
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'status' => 'success'
        ])->withCookie(cookie()->forget('auth_token'))
            ->withCookie(cookie()->forget('user_data'));
    }
}

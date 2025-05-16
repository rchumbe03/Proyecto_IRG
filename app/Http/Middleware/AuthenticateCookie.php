<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateCookie
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('auth_token');

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'No autenticado'
            ], 401);
        }

        $accessToken = PersonalAccessToken::findToken($token);

        if (!$accessToken) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token inválido'
            ], 401);
        }

        $user = $accessToken->tokenable;
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Usuario no encontrado'
            ], 401);
        }

        // Verificar el tipo de usuario y las rutas permitidas
        $userType = $user instanceof \App\Models\Admin ? 'admin' : 'user';
        $path = $request->path();

        // Verificar acceso a rutas de administrador
        if (str_starts_with($path, 'api/admin') && $userType !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Acceso denegado'
            ], 403);
        }

        // Añadir el usuario autenticado a la request
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}

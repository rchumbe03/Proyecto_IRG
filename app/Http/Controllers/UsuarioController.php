<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User; // Asegúrate de que el modelo User existe
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Obtener datos del perfil del usuario
     */
    public function getProfile()
    {
        // Obtiene el usuario autenticado (ajusta según tu sistema de autenticación)
        $user = Auth::user(); // O usa Auth::guard('admin')->user() si es diferente
        
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        return response()->json($user);
    }

    /**
     * Actualizar datos del perfil del usuario
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user(); // O el guard correspondiente
        
        $validatedData = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'direction' => 'sometimes|string',
            'telefono' => 'sometimes|string|max:20',
            'dni' => 'sometimes|string|max:20',
            'edad' => 'sometimes|string',
            'cv' => 'sometimes|url|max:255',
        ]);

        $user->update($validatedData);

        return response()->json($user);
    }
}
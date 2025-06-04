<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User; // Asegúrate que el modelo User está bien configurado
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Obtener datos del perfil del usuario autenticado.
     */
    public function getProfile()
    {
        $user = Auth::user(); // Ajusta guard si usas uno personalizado

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Opcional: puedes devolver solo campos específicos si quieres
        return response()->json([
            'id' => $user->id,
            'nombre' => $user->nombre,
            'email' => $user->email,
            'foto_perfil' => $user->foto_perfil,
            'direccion' => $user->direccion,
            'edad' => $user->edad,
            'dni' => $user->dni,
            'telefono' => $user->telefono,
            'cv' => $user->cv,
        ]);
    }

    /**
     * Actualizar datos del perfil del usuario autenticado.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $validatedData = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'direccion' => 'sometimes|string|max:255',
            'telefono' => 'sometimes|string|max:20',
            'dni' => 'sometimes|string|max:20',
            'edad' => 'sometimes|integer|min:0|max:150',
            'cv' => 'sometimes|string|max:255', // Podrías cambiar a url si quieres validar URLs
            'foto_perfil' => 'sometimes|string|max:255', // Si quieres permitir actualizar foto (url o path)
        ]);

        $user->update($validatedData);

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $user
        ]);
    }
}

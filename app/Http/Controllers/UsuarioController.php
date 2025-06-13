<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

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
     * Agregar nuevo usuario
     */
    public function guardarDatosPago(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:8',
            'direccion' => 'required|string',
            'ciudad' => 'required|string',
            'codigo_postal' => 'required|string|max:10',
            'pais' => 'required|string',
            'estado' => 'required|string',
            'prefijo_telefono' => 'required|string|max:5',
            'telefono' => 'required|string|max:20',
            'edad' => 'required|integer',
            'dni' => 'required|string|max:20',
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);

        $usuario = Usuario::create($validatedData);

        return response()->json(['message' => 'Datos guardados correctamente', 'usuario' => $usuario], 201);
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

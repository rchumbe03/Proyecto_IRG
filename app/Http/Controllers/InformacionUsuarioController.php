<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InformacionUsuarioController extends Controller
{
    public function index()
    {
        $user = Auth::user();

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

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'nullable|string',
            'telefono' => 'nullable|string|max:20',
            'dni' => 'nullable|string|max:20',
            'edad' => 'nullable|integer|min:0|max:120',
            'cv' => 'nullable|string|max:255',
        ]);
        
        //ACTULIZAR CAMPOS
        $user->nombre = $validated['nombre'];
        $user->direccion = $validated['direccion'] ?? $user->direccion;
        $user->telefono = $validated['telefono'] ?? $user->telefono;
        $user->dni = $validated['dni'] ?? $user->dni;
        $user->edad = $validated['edad'] ?? $user->edad;
        $user->cv = $validated['cv'] ?? $user->cv;

        $user->save();

        return response()->json($user);
    }
}

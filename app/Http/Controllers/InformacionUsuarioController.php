<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InformacionUsuarioController extends Controller
{
    public function index()
    {
        // Obtenemos el usuario autenticado
        $user = Auth::user();

        // Retornamos solo los campos necesarios
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
}

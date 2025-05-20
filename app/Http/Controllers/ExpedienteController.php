<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expediente;

class ExpedienteController extends Controller
{
    public function show($userId)
    {
        // Busca el expediente por el ID de usuario
        $expediente = Expediente::where('id_usuario', $userId)->first();

        if (!$expediente) {
            return response()->json(['error' => 'Expediente no encontrado'], 404);
        }

        // Devuelve el porcentaje (ajusta el nombre del campo si es diferente)
        return response()->json([
            'porcentaje' => $expediente->porcentaje
        ]);
    }
}

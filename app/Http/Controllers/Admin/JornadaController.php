<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Jornada;
use Illuminate\Http\Request;

class JornadaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Devolver todas las jornadas
        return response()->json(Jornada::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $request->validate([
            'tipo' => 'required|in:virtual,presencial',
            'fecha' => 'required|date',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        // Crear la jornada
        $jornada = Jornada::create($request->all());

        // Devolver la jornada creada
        return response()->json($jornada, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar la jornada por ID
        $jornada = Jornada::find($id);

        // Si la jornada no existe, devolver un error 404
        if (!$jornada) {
            return response()->json(['error' => 'Jornada no encontrada'], 404);
        }

        // Devolver la jornada encontrada
        return response()->json($jornada);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        // Encontrar la jornada por ID
        $jornada = Jornada::find($id);

        // Si la jornada no existe, devolver un error 404
        if (!$jornada) {
            return response()->json(['error' => 'Jornada no encontrada'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'tipo' => 'required|in:virtual,presencial',
            'fecha' => 'required|date',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        // Actualizar la jornada
        $jornada->update($request->all());

        // Devolver la jornada actualizada
        return response()->json($jornada);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        // Encontrar la jornada por ID
        $jornada = Jornada::find($id);

        // Si la jornada no existe, devolver un error 404
        if (!$jornada) {
            return response()->json(['error' => 'Jornada no encontrada'], 404);
        }

        // Eliminar la jornada
        $jornada->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Jornada eliminada']);
    }
}

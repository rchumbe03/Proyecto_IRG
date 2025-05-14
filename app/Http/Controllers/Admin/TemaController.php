<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tema;
use Illuminate\Http\Request;

class TemaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Devolver todas las jornadas
        return response()->json(Tema::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'id_curso' => 'required|exists:cursos,id',
            'id_fase' => 'required|exists:fases,id',
        ]);

        // Crear el tema
        $tema = Tema::create($request->all());

        // Devolver el tema creado
        return response()->json($tema, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar el tema por ID
        $tema = Tema::find($id);

        // Si el tema no existe, devolver un error 404
        if (!$tema) {
            return response()->json(['error' => 'Tema no encontrado'], 404);
        }

        // Devolver el tema encontrado
        return Tema::with('clases')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        // Encontrar la jornada por ID
        $tema = Tema::find($id);

        // Si la jornada no existe, devolver un error 404
        if (!$tema) {
            return response()->json(['error' => 'Tema no encontrado'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'tipo' => 'required|in:virtual,presencial',
            'fecha' => 'required|date',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        // Actualizar la jornada
        $tema->update($request->all());

        // Devolver la jornada actualizada
        return response()->json($tema);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        // Encontrar el tema por ID
        $tema = Tema::find($id);

        // Si la tema no existe, devolver un error 404
        if (!$tema) {
            return response()->json(['error' => 'Tema no encontrada'], 404);
        }

        // Eliminar la tema
        $tema->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Tema eliminada']);
    }
}

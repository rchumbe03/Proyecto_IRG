<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clase;
use Illuminate\Http\Request;

class ClaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Devolver todas las clases
        return response()->json(Clase::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $validated = $request->validate([
            'titulo' => 'required|string',
            'tipo' => 'required|in:Video,Virtual,Presencial',
            'url' => 'nullable|string',
            'id_tema' => 'required|exists:temas,id',
        ]);

        // Crear la clase
        return Clase::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar la clase por ID
        $clase = Clase::find($id);

        // Si la clase no existe, devolver un error 404
        if (!$clase) {
            return response()->json(['error' => 'Clase no encontrada'], 404);
        }

        // Devolver la clase encontrado
        return response()->json($clase);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // Encontrar la clase por ID
        $clase = Clase::find($id);

        // Si la clase no existe, devolver un error 404
        if (!$clase) {
            return response()->json(['error' => 'Modulo no encontrado'], 404);
        }

        // Validar ID de la clase
        $request->validate([
            'titulo' => 'required|string',
            'tipo' => 'required|in:Video,Virtual,Presencial',
            'url' => 'nullable|string',
            'id_tema' => 'required|exists:temas,id',
        ]);

        // Actualizar la clase
        $clase->update($request->all());

        // Devolver la clase actualizada
        return response()->json($clase);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // Validar ID del módulo
        $clase = Clase::find($id);

        // Si el clase no existe, devolver un error 404
        if (!$clase) {
            return response()->json(['error' => 'Clase no encontrado'], 404);
        }

        // Eliminar el módulo
        $clase->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Clase eliminada']);
    }
}

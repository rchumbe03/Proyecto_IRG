<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Devolver todos los modulos
        return response()->json(Modulo::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'required|string|min:5|max:100',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        // Crear el modulo
        $modulo = Modulo::create($request->all());
        // Devolver el modulo creado
        return response()->json($modulo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar el módulo por ID
        $modulo = Modulo::find($id);

        // Si el modulo no existe, devolver un error 404
        if (!$modulo) {
            return response()->json(['error' => 'Modulo no encontrado'], 404);
        }

        // Devolver el módulo encontrado
        return response()->json($modulo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // Encontrar el módulo por ID
        $modulo = Modulo::find($id);

        // Si el modulo no existe, devolver un error 404
        if (!$modulo) {
            return response()->json(['error' => 'Modulo no encontrado'], 404);
        }

        // Validar ID del módulo
        $request->validate([
            'titulo' => 'required|string|min:5|max:100',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        // Actualizar el módulo
        $modulo->update($request->all());

        // Devolver el módulo actualizado
        return response()->json($modulo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // Validar ID del módulo
        $modulo = Modulo::find($id);

        // Si el modulo no existe, devolver un error 404
        if (!$modulo) {
            return response()->json(['error' => 'Modulo no encontrado'], 404);
        }

        // Eliminar el módulo
        $modulo->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Modulo eliminado']);
    }
}

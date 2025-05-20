<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cursos = Curso::all();
        return response()->json($cursos); // ✅ obligatorio para APIs
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'required|string',
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación de imagen
            'descripcion' => 'required|string',
            'desarrollador' => 'required|string',
        ]);

        // Crear el curso
        $curso = Curso::create($request->all());
        // Devolver el curso creado
        return response()->json($curso, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {

        // Encontrar el curso por ID
        $curso = Curso::find($id);

        // Si el curso no existe, devolver un error 404
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        // Devolver el curso encontrado
        return response()->json($curso);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // Validar ID del curso
        $curso = Curso::find($id);

        // Si el curso no existe, devolver un error 404
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'required|string',
            'imagen' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048', // Validación de imagen
            'descripcion' => 'required|string',
            'desarrollador' => 'required|string',
        ]);

        // Actualizar el curso
        $curso->update($request->all());
        // Devolver el curso actualizado
        return response()->json($curso);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // Encontrar el curso por ID
        $curso = Curso::find($id);
        // Si el curso no existe, devolver un error 404
        if (!$curso) {
            return response()->json(['error' => 'Curso no encontrado'], 404);
        }

        // Eliminar el curso
        $curso->delete();

        // Devolver una respuesta vacía con código 204
        return response()->json(['message' => 'Curso eliminado'], 204);
    }
}

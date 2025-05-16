<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tema;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TemaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $temas = Tema::with(['fase', 'clases'])->get()->map(function ($tema) {
                return [
                    'id' => $tema->id,
                    'titulo' => $tema->titulo,
                    'descripcion' => $tema->descripcion,
                    'fase' => [
                        'id' => $tema->fase->id,
                        'nombre' => $tema->fase->nombre
                    ],
                    'clases' => $tema->clases->map(function ($clase) {
                        return [
                            'id' => $clase->id,
                            'titulo' => $clase->titulo,
                            'tipo' => $clase->tipo,
                            'url' => $clase->url
                        ];
                    })
                ];
            });

            return response()->json($temas, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener los temas',
                'message' => $e->getMessage()
            ], 500);
        }
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

        // Devolver el tema encontrado con sus clases
        return Tema::with('clases')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        // Encontrar el tema por ID
        $tema = Tema::find($id);

        // Si el tema no existe, devolver un error 404
        if (!$tema) {
            return response()->json(['error' => 'Tema no encontrado'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'sometimes|required|string',
            'descripcion' => 'sometimes|required|string',
            'id_curso' => 'sometimes|required|exists:cursos,id',
            'id_fase' => 'sometimes|required|exists:fases,id',
        ]);

        // Actualizar el tema
        $tema->update($request->all());

        // Devolver el tema actualizado
        return response()->json($tema);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        // Encontrar el tema por ID
        $tema = Tema::find($id);

        // Si el tema no existe, devolver un error 404
        if (!$tema) {
            return response()->json(['error' => 'Tema no encontrada'], 404);
        }

        // Eliminar el tema
        $tema->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Tema eliminada']);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Archivo;
use Illuminate\Http\Request;

class ArchivoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        // Devolver todos los archivos
        return response()->json(Archivo::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // Validar los datos de entrada
        $request->validate([
            'tipo' => 'required|in:pdf,video,imagen,ppt,otros',
            'url' => 'required|url|max:255',
            'id_modulo' => 'required|exists:modulos,id'
        ]);

        // Crear el archivo
        $archivo = Archivo::create($request->all());

        // Devolver el archivo creado
        return response()->json($archivo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar el archivo por ID
        $archivo = Archivo::find($id);

        // Si el archivo no existe, devolver un error 404
        if (!$archivo) {
            return response()->json(['error' => 'Archivo no encontrado'], 404);
        }

        // Devolver el archivo encontrado
        return response()->json($archivo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        // Encontrar el archivo por ID
        $archivo = Archivo::find($id);

        // Si el archivo no existe, devolver un error 404
        if (!$archivo) {
            return response()->json(['error' => 'Archivo no encontrado'], 404);
        }

        // Validar ID del archivo
        $request->validate([
            'tipo' => 'required|in:pdf,video,imagen,ppt,otros',
            'url' => 'required|string',
            'id_modulo' => 'required|exists:modulos,id'
        ]);

        // Actualizar el archivo
        $archivo->update($request->all());

        // Devolver el archivo actualizado
        return response()->json($archivo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // Encontrar el archivo por ID
        $archivo = Archivo::find($id);

        // Si el archivo no existe, devolver un error 404
        if (!$archivo) {
            return response()->json(['error' => 'Archivo no encontrado'], 404);
        }

        // Eliminar el archivo
        $archivo->delete();

        // Devolver una respuesta
        return response()->json(['message' => 'Archivo eliminado correctamente']);
    }
}

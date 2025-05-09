<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return response()->json(Notificacion::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'titulo' => 'required|string|min:5|max:100',
            'contenido' => 'required|string|min:10',
            'id_admin' => 'required|exists:admins,id',
            'nombre_admin' => 'required|string|max:100'
        ]);

        $notificacion = Notificacion::create($request->all());
        return response()->json($notificacion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // Encontrar la notificación por ID
        $notificacion = Notificacion::find($id);

        // Si la notificación no existe, devolver un error 404
        if (!$notificacion) {
            return response()->json(['error' => 'Notificación no encontrada'], 404);
        }

        // Devolver la notificación encontrada
        return response()->json($notificacion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        // Validar ID de la notificación
        $notificacion = Notificacion::find($id);

        // Si la notificación no existe, devolver un error 404
        if (!$notificacion) {
            return response()->json(['error' => 'Notificación no encontrada'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'titulo' => 'required|string|min:5|max:100',
            'contenido' => 'required|string|min:10',
            'id_admin' => 'required|exists:admins,id',
            'nombre_admin' => 'required|string|max:100'
        ]);

        // Actualizar la notificación
        $notificacion->update($request->all());

        // Devolver la notificación actualizada
        return response()->json($notificacion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        // Encontrar la notificación por ID
        $notificacion = Notificacion::find($id);
        // Si la notificación no existe, devolver un error 404
        if (!$notificacion) {
            return response()->json(['error' => 'Notificación no encontrada'], 404);
        }
        // Eliminar la notificación
        $notificacion->delete();
        // Devolver una respuesta
        return response()->json(['message' => 'Notificación eliminada']);
    }
}

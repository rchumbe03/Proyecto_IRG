<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Notificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class NotificacionController extends Controller
{
    public function index()
    {
        try {
            $notificaciones = Notificacion::with('admin')
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json($notificaciones);
        } catch (\Exception $e) {
            Log::error('Error en NotificacionController@index: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al obtener notificaciones',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string',
                'id_admin' => 'required|integer'
            ]);

            $notificacion = Notificacion::create([
                'titulo' => $request->titulo,
                'contenido' => $request->contenido,
                'id_admin' => $request->id_admin,
                'nombre_admin' => Admin::find($request->id_admin)->nombre ?? 'Administrador',
                'created_at' => now()
            ]);

            return response()->json($notificacion, 201);
        } catch (\Exception $e) {
            Log::error('Error creando notificación: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al crear la notificación',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string',
                'id_admin' => 'required|integer'
            ]);

            $notificacion = Notificacion::findOrFail($id);

            // Verifica que el admin que intenta actualizar sea el mismo que creó la notificación
            if ($notificacion->id_admin !== $request->id_admin) {
                return response()->json(['message' => 'No autorizado para editar esta notificación'], 403);
            }

            $notificacion->update([
                'titulo' => $request->titulo,
                'contenido' => $request->contenido
            ]);

            return response()->json($notificacion->fresh());
        } catch (\Exception $e) {
            Log::error('Error actualizando notificación: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al actualizar la notificación',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $notificacion = Notificacion::findOrFail($id);

            // Verifica que el admin que intenta eliminar sea el mismo que creó la notificación
            if ($notificacion->id_admin !== (int)$request->id_admin) {
                return response()->json(['message' => 'No autorizado para eliminar esta notificación'], 403);
            }

            $notificacion->delete();
            return response()->json(['message' => 'Notificación eliminada con éxito']);
        } catch (\Exception $e) {
            Log::error('Error eliminando notificación: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al eliminar la notificación',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

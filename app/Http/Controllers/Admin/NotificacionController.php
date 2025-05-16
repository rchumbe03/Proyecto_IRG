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
            /** @var Admin $admin */
            $admin = Auth::guard('admin')->user();

            $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string'
            ]);

            $notificacion = Notificacion::create([
                'titulo' => $request->titulo,
                'contenido' => $request->contenido,
                'id_admin' => $admin ? $admin->id : 1, // ID por defecto si no hay admin
                'nombre_admin' => $admin ? $admin->nombre : 'Administrador', // Nombre por defecto si no hay admin
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

    public function update(Request $request, $id) {
        if (!Auth::guard('admin')->check())
        {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $notificacion = Notificacion::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string'
        ]);

        $notificacion->titulo = $request->titulo;
        $notificacion->contenido = $request->contenido;
        $notificacion->save();

        return response()->json($notificacion);
    }

    public function destroy($id)
    {
        if (!Auth::guard('admin')->check()) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $notificacion = Notificacion::findOrFail($id);
        $notificacion->delete();

        return response()->json(null, 204);
    }
}

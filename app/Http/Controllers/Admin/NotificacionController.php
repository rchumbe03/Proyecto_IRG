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
        return response()->json(Notificacion::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'titulo' => 'required|string|max:100',
            'contenido' => 'required|string',
            'admin_id' => 'required|exists:admins,id'
        ]);

        $notificacion = Notificacion::create($request->all());
        return response()->json($notificacion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return response()->json(Notificacion::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $notificacion = Notificacion::findOrFail($id);
        $notificacion->update($request->all());
        return response()->json($notificacion, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        Notificacion::destroy($id);
        return response()->json(null, 204);
    }
}

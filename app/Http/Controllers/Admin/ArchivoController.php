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
        return response()->json(Archivo::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'tipo' => 'required|in:pdf,video,imagen,ppt,otros',
            'url' => 'required|string',
            'modulo_id' => 'required|exists:modulos,id'
        ]);

        $archivo = Archivo::create($request->all());
        return response()->json($archivo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return response()->json(Archivo::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $archivo = Archivo::findOrFail($id);
        $archivo->update($request->all());
        return response()->json($archivo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        Archivo::destroy($id);
        return response()->json(null, 204);
    }
}

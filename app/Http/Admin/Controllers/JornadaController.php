<?php

namespace App\Http\Admin\Controllers;

use App\Models\Jornada;
use Illuminate\Http\Request;

class JornadaController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return response()->json(Jornada::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'tipo' => 'required|in:virtual,presencial',
            'fecha' => 'required|date',
            'curso_id' => 'required|exists:cursos,id'
        ]);

        $jornada = Jornada::create($request->all());
        return response()->json($jornada, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return response()->json(Jornada::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $jornada = Jornada::findOrFail($id);
        $jornada->update($request->all());
        return response()->json($jornada, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        Jornada::destroy($id);
        return response()->json(null, 204);
    }
}

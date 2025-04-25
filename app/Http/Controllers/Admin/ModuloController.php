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
        return response()->json(Modulo::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'titulo' => 'required|string|max:100',
            'id_curso' => 'required|exists:cursos,id'
        ]);

        $modulo = Modulo::create($request->all());
        return response()->json($modulo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return response()->json(Modulo::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $modulo = Modulo::findOrFail($id);
        $modulo->update($request->all());
        return response()->json($modulo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        Modulo::destroy($id);
        return response()->json(null, 204);
    }
}

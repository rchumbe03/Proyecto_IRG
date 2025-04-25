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
    public function index() {
        return response()->json(Curso::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'titulo' => 'required|string|max:100',
            'tema' => 'required|string|max:100',
            'id_admin' => 'required|exists:admins,id'
        ]);

        $curso = Curso::create($request->all());
        return response()->json($curso, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        return response()->json(Curso::findOrFail($id), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $curso = Curso::findOrFail($id);
        $curso->update($request->all());
        return response()->json($curso, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        Curso::destroy($id);
        return response()->json(null, 204);
    }
}

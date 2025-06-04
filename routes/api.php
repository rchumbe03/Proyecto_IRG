<?php

use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\TemaController;
use App\Http\Controllers\Admin\ClaseController;
use App\Http\Controllers\Admin\NotificacionController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\InformacionUsuarioController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/check-admin', function () {
    if (Auth::guard('admin')->check()) {
        return response()->json([
            'isAdmin' => true,
            'user' => Auth::guard('admin')->user()
        ]);
    }
    return response()->json(['isAdmin' => false]);
});

Route::get('/temas', [TemaController::class, 'index']);
Route::get('/clases', [ClaseController::class, 'index']);
Route::apiResource('cursos', CursoController::class);

// Rutas protegidas para administradores
Route::middleware(['auth.cookie'])->prefix('admin')->group(function () {
    Route::apiResource('cursos', CursoController::class);
    Route::apiResource('temas', TemaController::class);
    Route::apiResource('clases', ClaseController::class);
});

// Rutas de notificaciones
Route::get('/notificaciones', [NotificacionController::class, 'index']);
Route::post('/notificaciones', [NotificacionController::class, 'store']);
Route::put('/notificaciones/{id}', [NotificacionController::class, 'update']);
Route::delete('/notificaciones/{id}', [NotificacionController::class, 'destroy']);

// Rutas protegidas para usuarios normales
Route::middleware(['auth.cookie'])->prefix('user')->group(function () {
    // Perfil de usuario
    Route::get('/perfil-usuario', [InformacionUsuarioController::class, 'index']);
    Route::put('/perfil-usuario', [InformacionUsuarioController::class, 'update']);
});

Route::get('/expediente/{userId}', [ExpedienteController::class, 'show']);

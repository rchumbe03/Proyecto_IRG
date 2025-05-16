<?php

use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\TemaController;
use App\Http\Controllers\Admin\ClaseController;
use App\Http\Controllers\Admin\NotificacionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/check-admin', function () {
    return response()->json([
        'isAdmin' => Auth::guard('admin')->check()
    ]);
});

// Rutas protegidas para administradores
Route::middleware(['auth.cookie'])->prefix('admin')->group(function () {
    Route::apiResource('cursos', CursoController::class);
    Route::apiResource('temas', TemaController::class);
    Route::apiResource('clases', ClaseController::class);
});

// Rutas de notificaciones sin restricciones
Route::get('/notificaciones', [NotificacionController::class, 'index']);
Route::post('/notificaciones', [NotificacionController::class, 'store']);
Route::put('/notificaciones/{id}', [NotificacionController::class, 'update']);
Route::delete('/notificaciones/{id}', [NotificacionController::class, 'destroy']);

// Rutas protegidas para usuarios normales
Route::middleware(['auth.cookie'])->prefix('user')->group(function () {
    // Aquí tus rutas para usuarios normales
});

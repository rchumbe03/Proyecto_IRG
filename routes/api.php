<?php

use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\TemaController;
use App\Http\Controllers\Admin\ClaseController;
use App\Http\Controllers\Admin\NotificacionController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Rutas protegidas para administradores
Route::middleware(['auth.cookie'])->prefix('admin')->group(function () {
    Route::apiResource('cursos', CursoController::class);
    Route::apiResource('temas', TemaController::class);
    Route::apiResource('clases', ClaseController::class);
    Route::apiResource('notificaciones', NotificacionController::class);
});

// Rutas protegidas para usuarios normales
Route::middleware(['auth.cookie'])->prefix('user')->group(function () {
    // Aquí tus rutas para usuarios normales
});

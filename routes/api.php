<?php

use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\TemaController;
use App\Http\Controllers\Admin\ClaseController;
use App\Http\Controllers\Admin\NotificacionController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Rutas para Curso
Route::apiResource('cursos', CursoController::class);

// Rutas para Tema
Route::apiResource('temas', TemaController::class);

// Rutas para Clase
Route::apiResource('clases', ClaseController::class);

// Rutas para Notificación
Route::apiResource('notificaciones', NotificacionController::class);

<?php

use App\Http\Controllers\Admin\ArchivoController;
use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\JornadaController;
use App\Http\Controllers\Admin\ModuloController;
use App\Http\Controllers\Admin\NotificacionController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\AuthController;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']); // Opcional


// CURSOS
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{id}', [CursoController::class, 'show']);
Route::post('/cursos', [CursoController::class, 'store']);
Route::put('/cursos/{id}', [CursoController::class, 'update']);
Route::delete('/cursos/{id}', [CursoController::class, 'destroy']);

//ARCHIVOS
Route::get('/archivos',[ArchivoController::class, 'index']);
Route::get('/archivos/{id}',[ArchivoController::class, 'show']);
Route::post('/archivos',[ArchivoController::class, 'store']);
Route::put('/archivos/{id}',[ArchivoController::class,'update']);
Route::delete('/archivos/{id}',[ArchivoController::class, 'destroy']);

//NOTIFICACIONES
Route::get('/notificaciones',[NotificacionController::class, 'index']);
Route::get('/notificaciones/{id}',[NotificacionController::class, 'show']);
Route::post('/notificaciones',[NotificacionController::class, 'store']);
Route::put('/notificaciones/{id}',[NotificacionController::class, 'update']);
Route::delete('/notificaciones/{id}',[NotificacionController::class, 'destroy']);

//JORNADAS
Route::get('/jornadas',[JornadaController::class, 'index']);
Route::get('/jornadas/{id}',[JornadaController::class, 'show']);
Route::post('/jornadas',[JornadaController::class, 'store']);
Route::put('/jornadas/{id}',[JornadaController::class, 'update']);
Route::delete('/jornadas/{id}',[JornadaController::class, 'destroy']);

//MODULOS
Route::get('/modulos',[ModuloController::class, 'index']);
Route::get('/modulos/{id}',[ModuloController::class, 'show']);
Route::post('/modulos',[ModuloController::class, 'store']);
Route::put('/modulos/{id}',[ModuloController::class, 'update']);
Route::delete('/modulos/{id}',[ModuloController::class, 'destroy']);

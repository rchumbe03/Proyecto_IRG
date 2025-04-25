<?php

use App\Http\Controllers\Admin\ArchivoController;
use App\Http\Controllers\Admin\CursoController;
use App\Http\Controllers\Admin\NotificacionController;
use App\Http\Controllers\ExpedienteController;
use Illuminate\Support\Facades\Route;


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

//EXPEDIENTES
Route::get('/expedientes',[ExpedienteController::class, 'index']);
Route::get('/expedientes/{id}',[ExpedienteController::class, 'show']);
Route::post('/expedientes',[ExpedienteController::class, 'store']);
Route::put('/expedientes/{id}',[ExpedienteController::class,'update']);
Route::delete('/expedientes/{id}',[ExpedienteController::class, 'destroy']);

//NOTIFICACIONES
Route::get('/notificaciones',[NotificacionController::class, 'index']);
Route::get('/notificaciones/{id}',[NotificacionController::class, 'show']);
Route::post('/notificaciones',[NotificacionController::class, 'store']);
Route::put('/notificaciones/{id}',[NotificacionController::class, 'update']);
Route::delete('/notificaciones/{id}',[NotificacionController::class, 'destroy']);

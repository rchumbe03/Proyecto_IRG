<?php

// ==============================
// IMPORTACIONES DE CONTROLADORES
// ==============================

// --- Controladores generales ---
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ClaseController;
use App\Http\Controllers\Admin\NotificacionController;
use App\Http\Controllers\Admin\TemaController;
use App\Http\Controllers\Admin\UsuarioController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\InformacionUsuarioController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// --- Controladores de administrador ---

// ==============================
// CHECKOUT (Stripe)
// ==============================
Route::post('/create-payment-intent', [CheckoutController::class, 'createPaymentIntent']);

// ==============================
// AUTENTICACIÓN
// ==============================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Verifica si el usuario es admin
Route::get('/check-admin', function () {
    if (Auth::guard('admin')->check()) {
        return response()->json([
            'isAdmin' => true,
            'user' => Auth::guard('admin')->user()
        ]);
    }
    return response()->json(['isAdmin' => false]);
});

// ==============================
// RECURSOS GENERALES (PÚBLICOS)
// ==============================
Route::get('/temas', [TemaController::class, 'index']);
Route::get('/clases', [ClaseController::class, 'index']);
Route::apiResource('cursos', CursoController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::get('/expediente/{userId}', [ExpedienteController::class, 'show']);

// ==============================
// NOTIFICACIONES (ADMIN Y USUARIO)
// ==============================
Route::get('/notificaciones', [NotificacionController::class, 'index']);
Route::post('/notificaciones', [NotificacionController::class, 'store']);
Route::put('/notificaciones/{id}', [NotificacionController::class, 'update']);
Route::delete('/notificaciones/{id}', [NotificacionController::class, 'destroy']);

// ==============================
// RECURSOS ADMINISTRADOR (PROTEGIDOS)
// ==============================
//                  auth:sanctum
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
//                  auth:sanctum
Route::middleware(['auth.cookie'])->prefix('user')->group(function () {
    // Perfil de usuario
    Route::get('/perfil-usuario', [InformacionUsuarioController::class, 'index']);
    Route::put('/perfil-usuario', [InformacionUsuarioController::class, 'update']);
});


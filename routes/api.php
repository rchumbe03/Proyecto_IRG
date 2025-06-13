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
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


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
// RUTA: Temas por Curso (pública)
// GET /api/cursos/{id}/temas
// ==============================

Route::get('/temas-por-curso-fase', function (Request $request) {
    $curso_id = $request->query('curso_id');
    $fase = $request->query('fase');

    // Buscar id de la fase según nombre y curso_id
    $faseRow = DB::table('fases')
        ->where('nombre', $fase)
        ->where('curso_id', $curso_id)
        ->first();

    if (!$faseRow) return response()->json([]);

    // Trae los temas de ese curso y fase
    $temas = DB::table('temas')
        ->where('id_curso', $curso_id)
        ->where('id_fase', $faseRow->id)
        ->select('id', 'titulo')
        ->get();

    return response()->json($temas);
});


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
// En routes/api.php, dentro del grupo protegido
Route::middleware(['auth.cookie'])->prefix('user')->group(function () {
    Route::get('/perfil', [UsuarioController::class, 'getProfile']);
    Route::put('/perfil', [UsuarioController::class, 'updateProfile']);
});





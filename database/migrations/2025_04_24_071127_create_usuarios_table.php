<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('foto_perfil')->nullable();
            $table->string('direccion');
            $table->string('ciudad')->nullable(); // Nueva columna
            $table->string('pais', 100)->nullable(); // Nueva columna
            $table->string('estado', 100)->nullable(); // Nueva columna
            $table->string('codigo_postal', 10)->nullable(); // Nueva columna
            $table->tinyInteger('edad')->nullable();
            $table->string('dni', 20)->nullable();
            $table->string('prefijo_telefono', 10)->nullable(); // Nueva columna
            $table->string('telefono', 20)->nullable();
            $table->string('cv')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};

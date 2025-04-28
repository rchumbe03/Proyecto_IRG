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
            $table->id(); // Esto crea un bigint unsigned auto_increment primary key
            $table->string('nombre', 25)->nullable();
            $table->string('email', 20)->nullable();
            $table->string('contraseña', 255)->nullable();
            $table->tinyInteger('edad')->nullable();
            $table->string('DNI', 20)->nullable();
            $table->string('direccion', 255)->nullable();
            $table->tinyInteger('telefono')->nullable(); // Cambiado de auto_increment
            $table->tinyInteger('antiguedad')->nullable(); // Cambiado de auto_increment
            $table->string('fase_actual', 100)->nullable();
            $table->string('fase_proxima', 100)->nullable();
            $table->tinyInteger('jornadas_realizadas')->nullable(); // Cambiado de auto_increment
            $table->tinyInteger('cursos_realizados')->nullable(); // Cambiado de auto_increment
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

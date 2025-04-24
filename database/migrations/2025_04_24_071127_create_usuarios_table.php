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
            $table->id(); // Cambiado de id('id_usuario')
            $table->string('nombre', 50);
            $table->string('email', 100)->unique();
            $table->string('contraseña');
            $table->string('telefono', 15)->nullable();
            $table->integer('edad')->nullable();
            $table->string('dni', 20)->nullable();
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

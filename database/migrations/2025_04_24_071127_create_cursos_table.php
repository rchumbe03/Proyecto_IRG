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
        Schema::create('cursos', function (Blueprint $table) {
            $table->id(); // Cambiado de id('id_curso') a id()
            $table->string('titulo', 100);
            $table->string('tema', 100);
            $table->text('descripcion')->nullable();
            $table->string('imagen');
            $table->text('requisitos')->nullable();
            $table->foreignId('id_admin')->constrained('admins')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};

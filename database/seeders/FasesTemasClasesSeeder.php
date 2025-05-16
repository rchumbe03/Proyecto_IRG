<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Fase;
use App\Models\Tema;
use App\Models\Clase;
use Illuminate\Database\Seeder;

class FasesTemasClasesSeeder extends Seeder
{
    public function run(): void
    {
        $fases = ['Base', 'Profesional', 'Avanzado', 'Experto'];

        // Obtener todos los cursos
        Curso::all()->each(function ($curso) use ($fases) {
            // Crear las 4 fases para cada curso
            foreach ($fases as $fase) {
                $nuevaFase = Fase::create([
                    'nombre' => $fase,
                    'curso_id' => $curso->id,
                    'requisitos' => 'Requisitos para nivel ' . $fase
                ]);

                // Crear 3 temas por cada fase
                Tema::factory()
                    ->count(3)
                    ->create([
                        'id_fase' => $nuevaFase->id
                    ])
                    ->each(function ($tema) {
                        // Crear 2 clases por cada tema
                        Clase::factory()
                            ->count(2)
                            ->create([
                                'id_tema' => $tema->id
                            ]);
                    });
            }
        });
    }
}

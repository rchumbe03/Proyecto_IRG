<?php

namespace Database\Factories;

use App\Models\Curso;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curso>
 */
class CursoFactory extends Factory
{
    /**
     * El modelo asociado al factory.
     *
     * @var string
     */
    protected $model = Curso::class;

    /**
     * Define el estado por defecto del modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cursos = [
            [
                'titulo' => 'Curso de PHP',
                'descripcion' => 'Aprende PHP desde cero',
                'desarrollador' => 'Juan Pérez'
            ],
            [
                'titulo' => 'Curso de Laravel',
                'descripcion' => 'Domina el framework Laravel',
                'desarrollador' => 'María García'
            ]
        ];

        return [
            'titulo' => $this->faker->unique()->randomElement(array_column($cursos, 'titulo')),
            'descripcion' => $this->faker->paragraph(),
            'desarrollador' => $this->faker->name(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Curso $curso) {
             if (Curso::count() > 2) {
                 Curso::where('id', $curso->id)->delete();
                 throw new \RuntimeException('No se pueden crear más de 2 cursos');
            }
        });
    }
}

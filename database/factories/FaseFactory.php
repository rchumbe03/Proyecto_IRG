<?php

namespace Database\Factories;

use App\Models\Curso;
use App\Models\Fase;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Fase>
 */
class FaseFactory extends Factory
{
    protected static int $sequence = 1;
    protected static array $fases = ['Base', 'Profesional', 'Avanzado', 'Experto'];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        if (static::$sequence > 4) {
            throw new \RuntimeException('No se pueden crear más de 4 fases');
        }

        $index = static::$sequence - 1;
        static::$sequence++;

        // Obtener un curso existente o crear uno si no hay ninguno
        $curso = Curso::first() ?? Curso::factory()->create();

        return [
            'nombre' => static::$fases[$index],
            'curso_id' => $curso->id,
            'requisitos' => $this->faker->sentence(),
        ];
    }
}

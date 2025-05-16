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
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->randomElement(['Base', 'Profesional', 'Avanzado', 'Experto']),
            'curso_id' => Curso::factory(),
            'requisitos' => $this->faker->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Clase;
use App\Models\Tema;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Clase>
 */
class ClaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tipo = $this->faker->randomElement(['virtual', 'presencial', 'video']);

        return [
            'titulo' => $this->faker->sentence(4),
            'tipo' => $tipo,
            'url' => $tipo === 'video' ? $this->faker->url() : null,
            'id_tema' => Tema::factory(),
        ];
    }
}

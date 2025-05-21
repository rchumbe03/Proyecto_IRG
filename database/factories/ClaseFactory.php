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
    $tema = Tema::factory()->create();
    $tipo = $tema->tipo;

    return [
        'titulo' => $this->faker->sentence(4),
        'url' => $this->faker->url(),
        'id_tema' => $tema->id,
    ];
}
}

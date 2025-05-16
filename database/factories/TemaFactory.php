<?php

namespace Database\Factories;

use App\Models\Fase;
use App\Models\Tema;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Tema>
 */
class TemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'descripcion' => $this->faker->paragraph(),
            'id_fase' => Fase::factory(),
        ];
    }
}

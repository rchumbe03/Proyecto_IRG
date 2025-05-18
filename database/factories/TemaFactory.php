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
        // Obtener una fase existente en lugar de crear una nueva
        $fase = Fase::inRandomOrder()->first() ?? Fase::factory()->create();

        return [
            'titulo' => $this->faker->sentence(3),
            'id_fase' => $fase->id,
            'id_curso' => $fase->curso_id,
        ];
    }
}

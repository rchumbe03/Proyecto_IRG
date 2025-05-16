<?php

namespace Database\Factories;

use App\Models\Admin;
use App\Models\Notificacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notificacion>
 */
class NotificacionFactory extends Factory
{
    /**
     * El modelo asociado al factory.
     *
     * @var string
     */
    protected $model = Notificacion::class;

    /**
     * Define el estado por defecto del modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $admin = Admin::factory()->create();

        return [
            'id_admin' => $admin->id,
            'nombre_admin' => $admin->nombre,
            'titulo' => fake()->sentence(),
            'contenido' => fake()->paragraph(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

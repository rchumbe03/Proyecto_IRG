<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UsuarioFactory extends Factory
{
    protected $model = Usuario::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'direccion' => $this->faker->address(),
            'ciudad' => $this->faker->city(),
            'pais' => $this->faker->country(),
            'estado' => $this->faker->state(),
            'codigo_postal' => $this->faker->postcode(),
            'edad' => $this->faker->numberBetween(18, 65),
            'dni' => $this->faker->unique()->numerify('########') . $this->faker->randomLetter(),
            'prefijo_telefono' => '+34',
            'telefono' => $this->faker->numerify('6########'),
            'remember_token' => Str::random(10),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Usuario $usuario) {
            if ($usuario->id === 1) {
                $usuario->update([
                    'email' => 'admin@test.com',
                    'password' => bcrypt('Password#123/'),
                ]);
            }
        });
    }
}

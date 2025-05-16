<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsuarioFactory extends Factory
{
    protected $model = Usuario::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'), // password
            'direccion' => $this->faker->address(),
            'edad' => $this->faker->numberBetween(18, 65),
            'dni' => $this->faker->unique()->numerify('########') . $this->faker->randomLetter(),
            'telefono' => $this->faker->numerify('6########'), // Formato español: 9 dígitos
            'remember_token' => Str::random(10),
        ];
    }
}

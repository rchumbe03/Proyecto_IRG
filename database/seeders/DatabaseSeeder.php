<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Notificacion;
use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Admin;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Crear un admin por defecto
        Admin::factory()->create([
            'nombre' => 'Admin Principal',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123')
        ]);

        // Crear algunos admins adicionales
        Admin::factory(3)->create();

        // Crear un usuario por defecto
        Usuario::factory()->create([
            'nombre' => 'Usuario Test',
            'email' => 'usuario@test.com',
            'password' => bcrypt('password123')
        ]);

        // Crear algunos usuarios adicionales
        Usuario::factory(10)->create();

        // Crear 2 cursos
        Curso::factory(2)->create();

        // Crear notificaciones
        Notificacion::factory(5)->create();

        $this->call([
            // ... otros seeders
            FasesTemasClasesSeeder::class,
        ]);
    }
}

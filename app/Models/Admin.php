<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $table = 'admins';

    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'contraseña',
    ];

    // Un Administrador tiene muchos cursos
    public function cursos()
    {
        return $this->hasMany(Curso::class, 'id_admin');
    }

    // Un Administrador tiene muchas notificaciones
    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'id_admin');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'email',
        'contraseña',
        'edad',
        'DNI',
        'direccion',
        'telefono',
        'antiguedad',
        'fase_actual',
        'fase_proxima',
        'jornadas_realizadas',
        'cursos_realizados',
    ];

    // Relación: Un usuario puede estar relacionado con varias empresas
    public function empresaUsuarios()
    {
        return $this->hasMany(EmpresaUsuario::class, 'id_usuario');
    }
}

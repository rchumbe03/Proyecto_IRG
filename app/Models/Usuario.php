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
        'telefono',
        'edad',
        'dni'
    ];

    // Relaciones

    public function expedientes()
    {
        return $this->hasMany(Expediente::class, 'id_usuario');
    }

    public function direccion()
    {
        return $this->hasOne(DireccionUsuario::class, 'id_usuario');
    }
}

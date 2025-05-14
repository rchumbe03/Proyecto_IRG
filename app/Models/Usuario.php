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
        'password',
        'cv',
        'foto_perfil',
        'direccion',
        'edad',
        'dni',
        'telefono',
    ];

    // Relación: Un usuario puede estar relacionado con varias empresas
    public function expediente()
    {
        return $this->hasOne(Expediente::class, 'id_usuario');
    }

    public function compras()
    {
        return $this->hasMany(Compra::class, 'id_usuario');
    }

    public function notificaciones()
    {
        return $this->hasMany(Notificacion::class, 'id_usuario');
    }
}

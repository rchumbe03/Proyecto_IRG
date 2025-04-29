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
        'telefono',
    ];

    // Relación: Un usuario puede estar relacionado con varias empresas
    public function empresa_usuario()
    {
        return $this->hasMany(EmpresaUsuario::class, 'id_usuario');
    }
    // Relación: Un usuario puede estar relacionado con una direccion
    public function direccion()
    {
        return $this->hasOne(Direccion::class, 'id_usuario');
    }
}

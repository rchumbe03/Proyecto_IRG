<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Model
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'cv',
        'foto_perfil',
        'direccion',
        'ciudad',
        'pais',
        'estado',
        'codigo_postal',
        'edad',
        'dni',
        'prefijo_telefono',
        'telefono',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function expediente()
    {
        return $this->hasOne(Expediente::class, 'id_usuario');
    }
}

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
        'edad',
        'dni',
        'telefono',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relación: Un usuario puede estar relacionado con varias empresas
    public function expediente()
    {
        return $this->hasOne(Expediente::class, 'id_usuario');
    }
}

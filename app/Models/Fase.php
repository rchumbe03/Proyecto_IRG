<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fase extends Model
{
    use HasFactory;

    protected $table = 'fases';

    protected $fillable = [
        'nombre',
        'descripcion',
        'requisitos',
    ];

    // Relación: Una fase puede estar relacionada con varios usuarios
    public function usuario()
    {
        return $this->hasMany(Usuario::class, 'fase_actual', 'id');
    }
}

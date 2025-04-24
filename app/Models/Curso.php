<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $table = 'cursos';

    protected $fillable = [
        'titulo',
        'tema',
        'descripcion',
        'requisitos',
        'id_admin'
    ];

    public function modulos()
    {
        return $this->hasMany(Modulo::class, 'id_curso');
    }

    public function expedientes()
    {
        return $this->hasMany(Expediente::class, 'id_curso');
    }
}

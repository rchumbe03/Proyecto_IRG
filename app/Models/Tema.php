<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    protected $table = 'temas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'id_curso',
        'id_fase'
    ];

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function fase()
    {
        return $this->belongsTo(Fase::class, 'id_fase');
    }

    public function clases()
    {
        return $this->hasMany(Clase::class, 'id_tema');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    use HasFactory;

    protected $table = 'temas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'id_fase'
    ];

    public function fase()
    {
        return $this->belongsTo(Fase::class, 'id_fase');
    }

    public function clases()
    {
        return $this->hasMany(Clase::class, 'id_tema');
    }

    public function curso()
{
    return $this->belongsTo(Curso::class, 'id_curso');
}
}

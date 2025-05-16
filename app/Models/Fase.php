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
        'curso_id',
        'requisitos',
    ];

    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    public function temas()
    {
        return $this->hasMany(Tema::class, 'id_fase');
    }
}

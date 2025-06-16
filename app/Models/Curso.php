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
        'descripcion',
        'desarrollador',
        'imagen',
        'id_admin'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, foreignKey: 'id_admin');
    }

    public function temas()
{
    return $this->hasMany(Tema::class, 'id_curso');
}
}

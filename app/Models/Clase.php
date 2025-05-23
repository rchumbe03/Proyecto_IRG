<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;

    protected $table = 'clases';

    protected $fillable = [
        'titulo',
        'tipo',
        'url',
        'id_tema'
    ];

    public function tema()
    {
        return $this->belongsTo(Tema::class, 'id_tema');
    }
}

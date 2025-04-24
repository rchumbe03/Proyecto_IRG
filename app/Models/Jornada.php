<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jornada extends Model
{
    protected $fillable = ['tipo', 'fecha', 'curso_id'];

    public function curso() {
        return $this->belongsTo(Curso::class);
    }
}

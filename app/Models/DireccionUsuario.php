<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DireccionUsuario extends Model
{
    use HasFactory;

    protected $table = 'direcciones_usuarios';

    protected $fillable = [
        'id_usuario',
        'direccion',
        'ciudad',
        'pais',
        'codigo_postal',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id');
    }
}

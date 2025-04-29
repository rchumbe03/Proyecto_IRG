<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';

    protected $fillable = [
        'id_usuario',
        'id_curso',
        'monto',
        'metodo_pago',
        'estado_pago',
    ];

    // Relación: Un pago pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id');
    }

    // Relación: Un pago pertenece a un curso
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso', 'id');
    }
}

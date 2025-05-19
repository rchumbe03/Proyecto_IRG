<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    use HasFactory;

    protected $table = 'notificaciones';

    protected $fillable = [
        'titulo',
        'contenido',
        'id_admin',
        'nombre_admin'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin');
    }
}

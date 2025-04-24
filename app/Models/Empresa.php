<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
    ];

    public function direccion()
    {
        return $this->hasOne(DireccionEmpresa::class, 'id_empresa');
    }
}

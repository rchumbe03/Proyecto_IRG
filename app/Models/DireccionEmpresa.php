<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DireccionEmpresa extends Model
{
    use HasFactory;

    protected $table = 'direcciones_empresas';

    protected $fillable = [
        'id_empresa',
        'direccion',
        'ciudad',
        'pais',
        'codigo_postal',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'id_empresa', 'id');
    }
}

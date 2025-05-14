<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $primaryKey = 'id_empresa';

    protected $fillable = [
        'nombre_empresa',
        'email_contacto',
        'telefono',
        'direccion',
        'cif',
    ];

    // Relación: Una empresa puede tener varios usuarios relacionados
    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'id_empresa');
    }
}

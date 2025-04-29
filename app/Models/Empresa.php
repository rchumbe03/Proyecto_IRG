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
        'cif',
    ];

    // Relación: Una empresa puede tener varios usuarios relacionados
    public function empresaUsuarios()
    {
        return $this->hasMany(EmpresaUsuario::class, 'id_empresa');
    }

    // Relación: Una empresa puede tener varias direcciones
    public function direccion()
    {
        return $this->hasOne(DireccionEmpresa::class, 'id_empresa');
    }
}

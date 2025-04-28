<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpresaUsuario extends Model
{
    use HasFactory;

    protected $table = 'empresa_usuario';

    protected $primaryKey = 'id_empresa_usuario';

    protected $fillable = [
        'id_empresa',
        'id_usuario',
        'curriculum_url',
    ];

    // Relación: EmpresaUsuario pertenece a una empresa
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'id_empresa');
    }

    // Relación: EmpresaUsuario pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}

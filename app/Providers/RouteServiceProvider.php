<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * El namespace para los controladores de tu aplicación.
     *
     * @var string|null
     */
    // protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define las rutas de tu aplicación.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }

    /**
     * Registra las rutas de tu aplicación.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * Define las rutas de la API.
     *
     * Estas rutas suelen tener el prefijo "api".
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            // ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    /**
     * Define las rutas web.
     *
     * Estas rutas suelen cargar vistas y no tienen prefijo.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
            // ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
}

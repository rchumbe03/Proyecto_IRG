<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: http://cors-errors.info
    |
    */

    'paths' => ['*'], // Permitir todas las rutas

    'allowed_methods' => ['*'], // Permitir todos los métodos HTTP

    'allowed_origins' => ['*'], // Permitir todos los orígenes

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permitir todos los encabezados

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

    'credentials' => true
];

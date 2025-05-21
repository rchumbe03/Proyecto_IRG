<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Proyecto Laravel + React

Este proyecto es una aplicación de **Laravel + React** que utiliza **Vite** para el desarrollo del frontend y **Laravel** para el backend.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

1. [PHP](https://www.php.net/) (versión 8.2 o superior)
2. [Composer](https://getcomposer.org/) (para gestionar dependencias de PHP)
3. [Node.js](https://nodejs.org/) (versión 16 o superior)
4. [NPM](https://www.npmjs.com/) (para gestionar dependencias de JavaScript)
5. [Git](https://git-scm.com/)

## Dependencias Principales

### Backend (Laravel v12.14.1)

1. **PHP Packages**:
   - laravel/framework: ^12.0
   - laravel/sanctum: ^4.1
   - laravel/tinker: ^2.10.1
   - monolog/monolog: 3.9.0
   - guzzlehttp/guzzle: 7.9.3

2. **Dev Dependencies**:
   - fakerphp/faker: ^1.23
   - laravel/pail: ^1.2.2
   - laravel/pint: ^1.13
   - laravel/sail: ^1.41
   - mockery/mockery: ^1.6
   - phpunit/phpunit: ^11.5.3

### Frontend

1. **React Packages**:
   - react: ^19.1.0
   - react-dom: ^19.1.0
   - react-router-dom: ^7.5.3
   - react-icons: ^5.5.0
   - @fortawesome/react-fontawesome: ^0.2.2
   - @fortawesome/free-solid-svg-icons: ^6.7.2

2. **Dev Dependencies**:
   - vite: ^6.3.2
   - @vitejs/plugin-react: ^4.4.1
   - tailwindcss: ^4.0.0
   - axios: ^1.9.0
   - concurrently: ^9.0.1

## Estructura del Proyecto

### Migrations

bash database/migrations/
 - ├── 2014_10_12_000000_create_users_table.php
 - ├── 0001_01_01_000001_create_cache_table
 - ├── 0001_01_01_000002_create_jobs_table
 - ├── 2025_04_24_071122_create_admins_table
 - ├── 2025_04_24_071125_create_cursos_table
 - ├── 2025_04_24_071126_create_fases_table
 - ├── 2025_04_24_071127_create_usuarios_table
 - ├── 2025_04_24_071128_create_temas_table
 - ├── 2025_04_24_071129_create_empresas_table
 - ├── 2025_04_24_071129_create_expedientes_table
 - ├── 2025_04_24_071129_create_notificaciones_table
 - ├── 2025_04_28_100850_create_compras_table
 - ├── 2025_05_13_192748_create_clases_table
 - ├── 2025_05_16_074614_create_personal_access_tokens_table

### Factories
database/factories/






### 1. Clonar el repositorio

Primero, clona este repositorio en tu máquina local usando el siguiente comando:

git clone https://github.com/rchumbe03/Proyecto_IRG.git
cd IRGInmobiliaria

2. Instalar dependencias de PHP (Laravel)
En la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias de PHP mediante Composer:

composer install
// Esto descargará las dependencias necesarias para el backend de Laravel.

3. Configurar el entorno
Copia el archivo .env.example a un nuevo archivo .env:

cp .env.example .env
Luego, configura tu base de datos y otras variables de entorno en el archivo .env.

4. Generar la clave de la aplicación
Ejecuta el siguiente comando para generar la clave de la aplicación de Laravel:

php artisan key:generate

5. Migrar la base de datos (si es necesario)
Si tienes migraciones pendientes, ejecuta:

php artisan migrate

6. Instalar dependencias de JavaScript (React)
En la raíz del proyecto, navega a la carpeta resources/js y ejecuta el siguiente comando para instalar las dependencias de JavaScript mediante npm:

npm install

7. Compilar los assets
Usa el siguiente comando para compilar los assets de React usando Vite:

npm run dev

Esto compilará tu proyecto frontend en modo desarrollo y se mantendrá escuchando cambios.

8. Ejecutar el servidor de desarrollo de Laravel
Finalmente, en otro terminal, ejecuta el servidor de Laravel:

php artisan serve

Esto iniciará el servidor de Laravel en http://localhost:8000.

Acceder al Proyecto

Frontend (React + Vite): http://localhost:5173/ (Vite en modo desarrollo)

Backend (Laravel): http://localhost:8000/

Construcción para Producción
Si deseas generar una versión optimizada de producción para el frontend, ejecuta:

npm run build
Esto generará los archivos optimizados en la carpeta public/build/.

Contribuciones
Si deseas contribuir a este proyecto, haz un fork del repositorio, crea una rama para tus cambios, y luego realiza un pull request.

Licencia
Este proyecto está licenciado bajo la MIT License - consulta el archivo LICENSE para más detalles.

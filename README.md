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

- [PHP](https://www.php.net/) (versión 8.0 o superior)
- [Composer](https://getcomposer.org/) (para gestionar dependencias de PHP)
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [NPM](https://www.npmjs.com/) (para gestionar dependencias de JavaScript)
- [Git](https://git-scm.com/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local.

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

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
- AdminFactory
- ClaseFactory
- CursoFactory
- FaseFactory
- NotificacionFactory
- TemaFactory
- UsuarioFactory

### Seeders
bash database/seeders/
- DatabaseSeeder.php
- FasesTemasClasesSeeder


## Instalación

1. **Clonar el repositorio**:

```bash
git clone [https://github.com/rchumbe03/Proyecto_IRG.git](https://github.com/rchumbe03/Proyecto_IRG.git) cd IRGInmobiliaria
```

2. **Instalar dependencias de PHP**:

```bash
composer install
```

3. **Configurar el entorno**:

```bash
cp .env.example .env
```

5. **Generar la clave de la aplicación**:

```bash
php artisan key:generate
```

5. **Configurar la base de datos**:
   - Editar el archivo `.env` con tus credenciales de base de datos
   - Ejecutar las migraciones y seeders:

```bash
php artisan migrate --seed
```

6. **Instalar dependencias de JavaScript**:

```bash
npm install
```

7. **Iniciar el servidor de desarrollo**:

```bash
# Terminal 1 - Laravel
php artisan serve
# Terminal 2 - Vite/React // Abre un segundo terminal
npm run dev
```

## Desarrollo

### Comandos útiles

1. **Laravel**:

```bash
# Crear un nuevo modelo con migración, factory y seeder
php artisan make:model NombreModelo -mfs
# Ejecutar pruebas
php artisan test
# Limpiar caché
php artisan optimize:clear
```

2. **React/Vite**:
```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build
```

## Contribuciones

### Comandos Git Esenciales

```bash
# Actualizar repositorio local con cambios del remoto
git fetch origin // Descarga los cambios del repositorio remoto sin aplicarlos
# Crear y cambiar a una nueva rama desde master
git checkout -b feature/nueva-funcionalidad master // Crea y cambia a una nueva rama basada en master
# Actualizar rama master local con cambios del remoto
git checkout master // Cambia a la rama master git pull origin master // Descarga y aplica los cambios de master remoto
# Fusionar cambios de master a tu rama
git checkout feature/nueva-funcionalidad // Cambia a tu rama de desarrollo git merge master // Fusiona los cambios de master en tu rama
# Guardar cambios en el repositorio local
git add . // Prepara todos los archivos modificados para commit git commit -m "descripción" // Guarda los cambios en el repositorio local con un mensaje
# Publicar cambios en GitHub
git push origin feature/nueva-funcionalidad // Sube los cambios de tu rama al repositorio remoto
```

### Flujo de Trabajo Recomendado

1. Mantén tu repositorio actualizado:
   ```bash
   git fetch origin
   git pull origin master
   ```

2. Crea una rama para tus cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad master
   ```

3. Realiza tus cambios y haz commits frecuentes:
   ```bash
   git add .
   git commit -m "Descripción detallada de los cambios"
   ```

4. Mantén tu rama actualizada con master:
   ```bash
   git checkout master
   git pull origin master
   git checkout feature/nueva-funcionalidad
   git merge master
   ```

5. Publica tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

6. Crea un Pull Request en GitHub para que tus cambios sean revisados

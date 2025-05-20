<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>App React</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite(['resources/js/src/main.jsx'])  {{-- o el archivo de entrada correcto --}}
</head>
<body>
<div id="root"></div>
</body>
</html>

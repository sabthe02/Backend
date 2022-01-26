# API REST con el framework Express (MongoDB)

## Instrucciones de uso

Crear archivo .env con variables de entorno (ejemplo debajo)
```bash
PORT=3000
JWT_KEY=super_secret_key
DB_HOST=localhost
DB_PORT=3306 (MySQL) o 27017 (MongoDB)
DB_NAME=todos
DB_USER=root
DB_PASSWORD=root
```

```bash
# Instalar dependencias
npm i

# Insertar datos de prueba
npm run seed

# Iniciar API
npm run dev
```

## Testing
```bash
# Correr pruebas unitarias
npm run test

# Correr pruebas unitarias y generar reporte de coverage
npm run test:coverage
```

## Debugging
El repo ya esta configurado para utilizar Visual Studio Code como tool para depurar.
Por mas info ir a: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

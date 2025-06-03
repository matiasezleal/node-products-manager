# Rest Project + TypeScript

Proyecto con TypeScript, Express y Rest.
No estamos implementando patron Repositorio

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Estructura del Proyecto

El proyecto sigue una arquitectura limpia y modular, organizada en las siguientes carpetas:

```
src/
├── config/           # Configuraciones y adaptadores
│   ├── jwt.adapter.ts       # Adaptador para manejo de JWT
│   ├── bcrypt.adapter.ts    # Adaptador para encriptación
│   ├── envs.ts             # Variables de entorno
│   └── regular-exp.ts      # Expresiones regulares
│
├── data/            # Capa de datos
│   └── mongo/             # Implementación de MongoDB
│
├── domain/          # Lógica de negocio
│   ├── dtos/              # Objetos de transferencia de datos
│   ├── entities/          # Entidades del dominio
│   └── errors/           # Manejo de errores personalizados
│
├── presentation/    # Capa de presentación
│   ├── auth/              # Autenticación y autorización
│   ├── services/          # Servicios de la aplicación
│   ├── routes.ts          # Definición de rutas
│   └── server.ts          # Configuración del servidor
│
└── app.ts           # Punto de entrada de la aplicación
```

### Descripción de las Carpetas

- **config/**: Contiene toda la configuración del proyecto, adaptadores y utilidades.
- **data/**: Maneja la capa de persistencia y acceso a datos.
- **domain/**: Define la lógica de negocio, entidades y reglas de la aplicación.
- **presentation/**: Gestiona la capa de presentación, incluyendo rutas, controladores y middleware.

## TO IMPROVE
Unificar el uso de objetos o clases en config
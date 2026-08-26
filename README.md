# FloraGestión

Estructura inicial de un sistema de gestión para una pequeña florería, construida con React, Vite y React Router. Esta fase no incluye backend, base de datos, autenticación ni ABM.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.

## Docker

```bash
docker compose up --build
```

Abrir `http://localhost:8080`. Nginx incluye el fallback a `index.html` para que las rutas `/flores`, `/clientes` y `/pedidos` funcionen al recargar.

Para detener el servicio: `docker compose down`.

## Estructura y próximas fases

- `src/components/`: layout, sidebar y encabezado compartidos.
- `src/pages/`: inicio y páginas placeholder de cada módulo.
- `Dockerfile`, `nginx.conf` y `docker-compose.yml`: entrega con Nginx en el puerto `8080`.
- Pendiente: ABM de flores, clientes y pedidos, estado en memoria, validaciones y filtros.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

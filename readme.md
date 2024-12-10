
# Test Node.js Service - CRUD con MongoDB, JWT y Validación

Este proyecto es un servicio backend desarrollado en Node.js que implementa un CRUD para usuarios, autenticación con JWT y validación de datos usando Ajv y ajv-formats. Está diseñado para interactuar con una base de datos MongoDB.

## **Características**
- CRUD completo para la tabla de usuarios.
- Autenticación con JWT para proteger las rutas.
- Validación de datos con Ajv y ajv-formats.
- Documentación de la API usando Swagger.
- Arquitectura organizada con carpetas para rutas, modelos y servicios.

---

## **Requisitos Previos**
- Node.js (versión 14 o superior).
- Yarn instalado globalmente.
- MongoDB corriendo localmente o en un servidor (como MongoDB Atlas).

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/kennyesid/test-nodejs.git
   cd test-nodejs
   ```

2. Instala las dependencias:
   ```bash
   yarn install
   ```

## **Ejecución del Proyecto**

1. Inicia el servidor en modo de desarrollo:
   ```bash
   yarn dev
   ```

2. El servidor estará corriendo en [http://localhost:4000](http://localhost:4000).

## **Estructura del Proyecto**

```
nodejs-service/
├── routes/
│   └── user.routes.js          # Rutas para el CRUD de usuarios
├── services/
│   └── user.service.js         # Validación y lógica de negocio para usuarios
├── models/
│   └── user.model.js           # Modelo de datos de usuario
├── middlewares/
│   └── auth.middleware.js      # Middleware para validar tokens JWT
├── sndexj.s                   # Punto de entrada del servidor
├── package.json                # Configuración del proyecto y dependencias
```

---

## **Rutas del API**

### **1. Registrar Usuario (POST /users/register)**
- **Descripción**: Crea un nuevo usuario.
- **Body**:
  ```json
  {
    "name": "admin",
    "email": "admin@spsgroup.com.br",
    "type": "admin",
    "password": "1234"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Usuario registrado",
    "user": {
      "_id": "63f7d74f2d13b541fc93b802",
      "name": "admin",
      "email": "admin@spsgroup.com.br",
      "type": "admin"
    }
  }
  ```

---

### **2. Iniciar Sesión (POST /users/login)**
- **Descripción**: Autentica al usuario y genera un token JWT.
- **Body**:
  ```json
  {
    "email": "admin@spsgroup.com.br",
    "password": "1234"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Inicio de sesión exitoso",
    "token": "<JWT_TOKEN>"
  }
  ```

---

### **3. Obtener Usuarios (GET /users)**
- **Descripción**: Lista todos los usuarios.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Respuesta**:
  ```json
  [
    {
      "_id": "63f7d74f2d13b541fc93b802",
      "name": "admin",
      "email": "admin@spsgroup.com.br",
      "type": "admin"
    }
  ]
  ```

---

### **4. Editar Usuario (PUT /users/:id)**
- **Descripción**: Actualiza un usuario por su ID.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Body**:
  ```json
  {
    "name": "Nuevo Admin",
    "email": "nuevoadmin@example.com",
    "type": "admin",
    "password": "5678"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Usuario actualizado",
    "user": {
      "_id": "63f7d74f2d13b541fc93b802",
      "name": "Nuevo Admin",
      "email": "nuevoadmin@example.com",
      "type": "admin"
    }
  }
  ```

---

### **5. Eliminar Usuario (DELETE /users/:id)**
- **Descripción**: Elimina un usuario por su ID.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Respuesta**:
  ```json
  {
    "message": "Usuario eliminado"
  }
  ```
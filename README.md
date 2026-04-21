# Sistema de Gestión de Clínica Médica

Aplicación full-stack para la gestión de una clínica médica con autenticación por roles y sistema de reservas de horas.

## Tecnologías

### Frontend
- React 18 + TypeScript
- React Router v6
- Bootstrap 5
- Axios

### Backend
- Express.js
- MongoDB + Mongoose
- GraphQL (Schema + Queries + Mutations)
- JWT Authentication

## Requisitos Previos

- Node.js 18+
- MongoDB Atlas cuenta (o MongoDB local)
- npm o yarn

## Instalación

### 1. Clonar el repositorio
```bash
cd www
```

### 2. Configurar variables de entorno

```bash
cd server
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
# MongoDB Atlas Connection String
MONGODB_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# JWT Secret (mínimo 32 caracteres)
SECRET=your-secure-secret-key-minimum-32-chars

# Server Port (opcional, default: 4000)
PORT=4000
```

### 3. Instalar dependencias

```bash
# Dependencias del servidor
cd server
npm install

# Dependencias del cliente
cd ../client
npm install
```

## Ejecución

### Terminal 1 - Servidor
```bash
cd server
npm start
```
El servidor estará disponible en: `http://localhost:4000`

### Terminal 2 - Cliente
```bash
cd client
npm start
```
El cliente estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
www/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── App.tsx         # Componente principal
│   │   ├── View*.tsx      # Vistas por rol
│   │   └── components/     # Componentes reutilizables
│   └── package.json
│
├── server/                 # Backend Express
│   ├── controllers/       # Controladores de rutas
│   ├── db/               # Conexión MongoDB
│   ├── graphql/          # Schema, Queries, Mutations
│   ├── models/           # Modelos Mongoose
│   ├── routes/           # Rutas REST
│   ├── server.js         # Entry point
│   └── .env              # Variables de entorno
│
└── package.json          # Scripts de desarrollo
```

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/user/signup` | Registrar usuario |
| POST | `/user/login` | Iniciar sesión |

### Doctors
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/doctor/:id` | Obtener doctor |
| POST | `/doctor` | Crear doctor |
| PUT | `/doctor/:id/availability` | Actualizar disponibilidad |

### Agenda
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/agenda` | Listar horas |
| POST | `/agenda` | Crear hora |
| PUT | `/agenda/:id` | Actualizar hora |

### GraphQL
- Endpoint: `/graphql`
- GraphiQL IDE: `http://localhost:4000/graphql`

## Roles de Usuario

- **Patient**: Reservar horas, ver horas reservadas
- **Doctor**: Ver pacientes en espera, marcar atención
- **Secretary**: Gestionar doctores, disponibilidad, recaudo

## Crear Usuario de Prueba

Desde MongoDB Compass o shell:

```javascript
// En la colección 'users'
{
  "name": "doctor1",
  "email": "doctor1@clinica.com",
  "password": "hashed-password",  // Usar bcrypt.hashSync('password', 10)
  "type": "doctor"
}
```

## Solución de Problemas

### Error de conexión MongoDB
Verificar que `MONGODB_URL` en `.env` sea correcto y que el cluster esté activo.

### Error CORS
El servidor está configurado para aceptar requests solo de `http://localhost:3000`.

### Puerto en uso
Cambiar `PORT` en `.env` o detener el proceso que use el puerto 4000/3000.

## Licencia

ISC
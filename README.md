# AIVhicles

Full-stack platform for AI-powered vehicle services.

## Projects

- `backend/` - Spring Boot REST API with JWT authentication.
- `frontend/` - React + TailwindCSS client.
- `db/schema.sql` - MySQL schema for required tables.

The project now includes a **Light Vehicles Catalog**:

- Backend endpoint `GET /api/vehicles/catalog?category=light` exposes filtered, paginated vehicle data without VINs.
- Frontend route `/catalog` renders an interactive catalog with search, filtering, sorting, and pagination.

## Backend Setup

```
cd backend
mvn spring-boot:run
```

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

This is a minimal scaffold to build upon for AI-powered vehicle services.

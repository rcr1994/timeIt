# TimeIt Project

A full-stack time tracking application with a TypeScript/Node.js backend and a Lit/TypeScript frontend.

## Project Structure

- `backend/` — Node.js + Express + Prisma (SQLite) API
- `frontend/` — Lit web components, TypeScript, Vite

## Getting Started

### Backend

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Set up the database:**
   ```bash
   npx prisma migrate dev --name init
   # (Optional) Seed with dummy data:
   npx ts-node prisma/seed-dummy.ts
   ```
3. **Start the backend server (with auto-reload):**
   ```bash
   npm run dev
   # or for one-time run:
   npx ts-node index.ts
   ```
   The backend runs at http://localhost:3001

### Frontend

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   The frontend runs at http://localhost:5173 (default Vite port)

## Features
- Track sessions with start/end time, duration, tag, and color
- View daily summaries and analytics dashboard
- Modern, type-safe codebase (TypeScript everywhere)

## Development Notes
- Backend auto-reloads with `nodemon` and `ts-node`.
- Database config is in `backend/prisma/schema.prisma`.
- Use `.env` for secrets (if needed).
- `node_modules/` and build output are gitignored.

---

Feel free to contribute or customize!

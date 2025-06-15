# TimeIt Backend

This is the backend for the TimeIt project. It provides a REST API for time tracking, built with Node.js, Express, TypeScript, and Prisma (SQLite).

## Setup

1. **Install dependencies:**
   ```bash
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

## Features
- Track sessions with start/end time, duration, tag, and color
- View daily summaries and analytics dashboard
- Modern, type-safe codebase (TypeScript everywhere)

## Development Notes
- Backend auto-reloads with `nodemon` and `ts-node`.
- Database config is in `prisma/schema.prisma`.
- Use `.env` for secrets (if needed).
- `node_modules/` and build output are gitignored.

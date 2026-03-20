# Local Network IP-based Chat Application

A real-time, minimal, and premium chat application built using React (Vite, Tailwind CSS, Framer Motion) and Node.js (Express, Socket.io, Redis). The system automatically groups users into the same chat room if they share the same network IP.

## Features
- **IP-Based Auto Rooms:** Users on the same network join the same room automatically.
- **Glassmorphism UI:** Stunning, premium design aesthetics inspired by Antigravity Stitch.
- **Real-Time Communication:** Instant messaging with typing indicators and online user counts.
- **Temporary Message Storage:** Messages are stored in Redis with a configurable TTL (e.g., 1 hour).
- **Security:** Built-in rate limiting, simple profanity filter, and basic protection mechanisms.

## Local Setup

### Prerequisites
- Node.js (v18+)
- Redis Server (running locally or via cloud like Upstash)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set your `REDIS_URL`.
4. Run `npm start`. The server will start on port `5000`.

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Optionally create a `.env` file to customize `VITE_BACKEND_URL`. By default, it looks for `http://localhost:5000`.
4. Run `npm run dev`. The app will start on standard Vite port `5173`.

## Deployment
- **Frontend:** Deployment-ready for Vercel. A `vercel.json` is included to handle SPA routing. You must set `VITE_BACKEND_URL` to point to your deployed backend URL.
- **Backend:** Deployment-ready for Render, Railway, or Heroku. A `render.yaml` configuration is included. You must provision a Redis instance (e.g. Upstash) and supply the correct environment variables.

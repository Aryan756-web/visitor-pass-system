# Visitor Pass System (MERN Stack)

This project is a simple visitor management system where users can register, log in, create appointments, and generate visitor passes with QR codes.

It is built using Node.js, Express, MongoDB, and React.

---

## Project Structure

visitor-pass-system/

backend/ → Express backend (API, authentication, database)
frontend/ → React frontend (UI, forms, API integration)
README.md
.env.example

---

## Backend Setup

cd backend
npm install

Create a `.env` file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start

---

## Frontend Setup

cd frontend
npm install
npm start

---

## API Endpoints

Auth:
POST /api/auth/register
POST /api/auth/login

Appointments:
POST /api/appointments
GET /api/appointments
PUT /api/appointments/:id
PUT /api/appointments/:id/approve

Pass:
POST /api/pass
GET /api/pass

---

## Notes

* Backend entry point is: backend/server.js
* Frontend is located in the frontend folder
* JWT is used for authentication
* QR codes are generated for passes

---

## Deployment

Backend: Render
Frontend: Netlify

---

This is a basic implementation for learning purposes.

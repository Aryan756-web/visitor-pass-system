# Visitor Pass System

This is a MERN stack based project where users can register, log in, create appointments and generate visitor passes. The main idea is to simulate a basic visitor management system where a host can approve appointments and passes can be generated for entry.

## Features

* User registration and login (JWT based authentication)
* Create appointment for visitors
* Approve or update appointment status
* Generate visitor pass with QR code
* View all appointments and passes

## Tech Stack

* Backend: Node.js, Express
* Database: MongoDB
* Frontend: React
* Authentication: JWT

## Folder Structure

* `/backend` → contains all server-side code (routes, controllers, models)
* `/frontend` → React app
* `.env.example` → environment variables reference

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-link>
cd visitor-pass-system
```

### 2. Setup backend

```
cd backend
npm install
```

Create a `.env` file inside backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

### 3. Setup frontend

The React frontend is included in the `/frontend` folder.

To run it:

cd frontend
npm install
npm start

The frontend is connected to the backend API for authentication, appointments, and pass generation.


## API Routes (basic)

### Auth

* POST /api/auth/register → register user
* POST /api/auth/login → login user

### Appointments

* POST /api/appointments → create appointment
* GET /api/appointments → get all appointments
* PUT /api/appointments/:id → update status
* PUT /api/appointments/:id/approve → approve appointment

### Pass

* POST /api/pass → generate pass
* GET /api/pass → get all passes

## Notes

* Some validations are basic and can be improved
* This project is for learning purpose
* QR code is generated using appointment ID

## Deployment

* Backend deployed on Render
* Frontend deployed on Netlify

---

That's it. This is a simple implementation of a visitor pass system using MERN stack.

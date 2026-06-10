# Visitor Pass Management System

## Project Overview

Visitor Pass Management System is a MERN Stack application designed to manage visitors, appointments, and digital visitor passes within an organization.

The system allows administrators to add visitors, schedule appointments, approve requests, generate QR-based visitor passes, send email notifications, download passes as PDF files, and monitor visitor activity through a dashboard.

---

## Live Demo

Frontend:
[(https://visitor-pass-system-six.vercel.app/)]

Backend:
https://visitor-pass-system-2.onrender.com

---

## Demo Login Credentials

Use the following account to access the application:

Email: [admin@test.com](mailto:admin@test.com)

Password: 123456

Note: This application is designed as an admin/staff dashboard. Visitors are managed by the administrator and do not require separate registration.

---

## Features

### Authentication

* User Login
* JWT Authentication
* Protected Routes

### Visitor Management

* Add New Visitor
* View All Visitors
* Delete Visitor
* Export Visitors to CSV

### Appointment Management

* Create Appointment
* View Appointments
* Search Appointments
* Filter Appointments by Status
* Approve Appointments

### Pass Management

* Generate Digital Visitor Pass
* Generate QR Code
* Email Notification on Pass Generation
* Download Visitor Pass as PDF

### Dashboard

* Total Visitors Count
* Total Appointments Count
* Total Passes Count
* Total Check-ins Count

---

## Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT Authentication
* Nodemailer
* PDFKit
* QRCode

### Database

* MongoDB Atlas
* Mongoose

---

## Project Structure

visitor-pass-system/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── utils/

│ └── server.js

│

├── frontend/

│ ├── public/

│ ├── src/

│ └── package.json

│

├── README.md

└── API_DOCS.md

---

## Installation and Setup

### Clone Repository

git clone https://github.com/Aryan756-web/visitor-pass-system.git

cd visitor-pass-system

---

### Backend Setup

cd backend

npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

Run Backend:

npm run dev

---

### Frontend Setup

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000

---

## Environment Variables

Required Variables:

MONGO_URI

JWT_SECRET

PORT

---

## API Documentation

Detailed API documentation is available in:

API_DOCS.md

---

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Visitor Management
* Appointment Management
* Generated PDF Pass

---

## Future Improvements

* Visitor Photo Upload
* SMS Notifications
* Check-In / Check-Out Tracking
* Advanced Dashboard Reports

---

## Author

Aaryan Karadkar

MERN Stack Assignment Project

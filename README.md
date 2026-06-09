# Visitor Pass Management System

## Project Overview

Visitor Pass Management System is a MERN Stack application developed to manage visitors, appointments, and digital visitor passes for an organization.

The system allows administrators to register visitors, schedule appointments, approve requests, generate QR-based visitor passes, download passes as PDF files, and monitor visitor statistics through a dashboard.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

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
* Download Visitor Pass as PDF
* Email Notification on Pass Generation

### Dashboard

* Total Visitors Count
* Total Appointments Count
* Total Passes Count
* Total Check-ins Count

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

## Folder Structure

project-root/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── utils/

│ └── server.js

│

├── frontend/

│ ├── src/

│ ├── public/

│ └── package.json

│

├── README.md

└── API_DOCS.md

## Installation

### Clone Repository

git clone <repository-url>

cd visitor-pass-system

### Backend Setup

cd backend

npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

Run backend:

npm run dev

### Frontend Setup

cd frontend

npm install

npm start

Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000

## Environment Variables

Required variables:

MONGO_URI

JWT_SECRET

PORT

## Future Improvements

* Visitor Photo Upload
* SMS Notifications
* Check-In / Check-Out Tracking
* Advanced Dashboard Reports

## Author

Aaryan Karadkar

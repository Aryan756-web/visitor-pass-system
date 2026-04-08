# Visitor Pass Management System

This is a full-stack MERN project where visitors can be registered, appointments can be created, and passes can be generated after approval.

The system also supports QR code generation, PDF pass download, and email notifications.

---

## 🚀 Features

- User Login (JWT based)
- Add / View / Delete Visitors
- Create Appointments
- Approve Appointments
- Generate Visitor Pass
- QR Code for each pass
- Download Pass as PDF
- Email Notification (using Ethereal for testing)
- Basic Dashboard with search and filter

---

## 🛠 Tech Stack

Frontend:
- React
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Other:
- JWT Authentication
- PDFKit (for PDF generation)
- QRCode
- Nodemailer (Ethereal)

---

## 🌐 Live Links

Frontend:
https://visitor-pass-frontend-backend.netlify.app/

Backend:
https://visitor-pass-system-1.onrender.com/

---

## ⚙️ How to Run Locally

### Backend

bash
cd backend
npm install
npm start

---

### API Endpoints

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

This is a basic implementation for learning purposes.

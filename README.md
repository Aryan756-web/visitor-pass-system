# Visitor Pass Management System

This project is a simple full-stack MERN application to manage visitors inside an organization.  
It allows staff to register visitors, create appointments, approve them, and generate a visitor pass.

Once a pass is generated, it includes a QR code and can be downloaded as a PDF.  
An email notification is also sent (using Ethereal test service).

---

## 🚀 What this project does

- Staff can login securely
- Add and manage visitors
- Create appointments for visitors
- Approve or reject appointments
- Generate passes for approved appointments
- Each pass includes:
  - Unique Pass ID
  - Valid time window
  - QR Code
- Pass can be downloaded as PDF
- Email is sent when pass is generated
- Dashboard shows appointments with filtering

---

## 🛠 Tech Stack

Frontend:
- React (basic routing and pages)
- Axios (API calls)

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Mongoose)

Other libraries:
- JWT (authentication)
- PDFKit (PDF generation)
- QRCode (QR generation)
- Nodemailer (email)
- Ethereal (for testing email)

---

## 🌐 Live Links

Frontend:
https://visitor-pass-frontend-backend.netlify.app/

Backend:
https://visitor-pass-system-e29h.onrender.com/

---

## 📁 Project Structure
root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── utils/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ └── components/
│
├── README.md
└── API_DOCS.md

---

## ⚙️ How to run locally

### 1. Clone the repo

git clone: https://github.com/Aryan756-web/visitor-pass-system.git
cd project-folder

---

### 2. Setup backend


cd backend
npm install


Create `.env` file:


MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret_key

Run backend:

npm start

---

### 3. Setup frontend

cd frontend
npm install
npm start

---

## 🔐 Authentication

- Login returns a JWT token
- Token is stored in localStorage
- All protected routes require this token

---

## 🧪 How to test the flow

1. Login
2. Add a visitor
3. Create an appointment
4. Approve the appointment
5. Click "Generate Pass"
6. Download PDF
7. Check email preview (in terminal → Ethereal link)

---

## 📧 Email functionality

Email is implemented using **Ethereal (test SMTP service)**.

Reason:
- Gmail blocks automated logins sometimes
- Ethereal is reliable for testing and demonstration

When a pass is generated:
- Email is "sent"
- Preview URL is shown in backend terminal
- That link opens the email in browser

---

## 📸 Screenshots
- Login page  
- Add visitor  
- Appointment creation  
- Approve button  
- Generate pass  
- PDF download  
- Email preview  

---

## ⚠️ Notes

- Token can expire, so login again if needed
- Email is for demo purpose (not real inbox delivery)
- Basic UI (focus was on functionality)

---

## 👤 Author

Aryan
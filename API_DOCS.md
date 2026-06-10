# API Documentation

## Base URLs

Local Development:

http://localhost:5000/api

Production:

https://visitor-pass-system-2.onrender.com/api

---

## Authentication

### Login User

POST /auth/login

Request Body

{
"email": "[admin@test.com](mailto:admin@test.com)",
"password": "123456"
}

Response

{
"token": "jwt_token",
"user": {
"id": "user_id",
"name": "Admin User"
}
}

---

## Visitors

### Create Visitor

POST /visitors

Headers

Authorization: Bearer TOKEN

Request Body

{
"name": "Rahul Sharma",
"email": "[rahul@test.com](mailto:rahul@test.com)",
"phone": "9876543210"
}

Response

{
"_id": "visitor_id",
"name": "Rahul Sharma",
"email": "[rahul@test.com](mailto:rahul@test.com)"
}

---

### Get All Visitors

GET /visitors

Headers

Authorization: Bearer TOKEN

---

### Delete Visitor

DELETE /visitors/:id

Headers

Authorization: Bearer TOKEN

---

## Appointments

### Create Appointment

POST /appointments

Headers

Authorization: Bearer TOKEN

Request Body

{
"visitor": "visitor_id",
"date": "2026-06-10"
}

---

### Get Appointments

GET /appointments

Headers

Authorization: Bearer TOKEN

---

### Approve Appointment

PUT /appointments/:id/approve

Headers

Authorization: Bearer TOKEN

---

## Pass Management

### Generate Pass

POST /pass

Headers

Authorization: Bearer TOKEN

Request Body

{
"appointmentId": "appointment_id"
}

Response

{
"message": "Pass created",
"pass": {
"_id": "pass_id"
}
}

---

### Get All Passes

GET /pass

Headers

Authorization: Bearer TOKEN

---

### Download Pass PDF

GET /pass/pdf/:id

Headers

Authorization: Bearer TOKEN

Description

Downloads the generated visitor pass as a PDF file containing visitor details and QR code.

---

## Dashboard

### Get Dashboard Statistics

GET /dashboard/stats

Headers

Authorization: Bearer TOKEN

Response

{
"visitors": 3,
"appointments": 2,
"passes": 2,
"checkins": 0
}

---

## Authentication Notes

All protected routes require:

Authorization: Bearer YOUR_JWT_TOKEN

The JWT token is returned after a successful login request.

---

## Test Credentials

Email:

[admin@test.com](mailto:admin@test.com)

Password:

123456

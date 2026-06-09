# API Documentation

Base URL

http://localhost:5000/api

---

## Authentication

### Register User

POST /auth/register

Request Body

{
"name": "Admin User",
"email": "[admin@test.com](mailto:admin@test.com)",
"password": "123456",
"role": "admin"
}

Response

{
"message": "User created"
}

---

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

### Get All Visitors

GET /visitors

Headers

Authorization: Bearer TOKEN

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

### Get Appointments

GET /appointments

Headers

Authorization: Bearer TOKEN

### Approve Appointment

PUT /appointments/:id/approve

Headers

Authorization: Bearer TOKEN

---

## Passes

### Generate Pass

POST /pass

Headers

Authorization: Bearer TOKEN

Request Body

{
"appointmentId": "appointment_id"
}

### Get Passes

GET /pass

Headers

Authorization: Bearer TOKEN

### Download PDF

GET /pass/pdf/:id

Headers

Authorization: Bearer TOKEN

Returns PDF file.

---

## Dashboard

### Get Dashboard Statistics

GET /dashboard/stats

Headers

Authorization: Bearer TOKEN

Response

{
"visitors": 3,
"appointments": 1,
"passes": 1,
"checkins": 0
}

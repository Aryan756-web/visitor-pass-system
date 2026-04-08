# API Documentation

## Auth

POST /api/auth/register
Body: name, email, password

POST /api/auth/login
Body: email, password

---

## Appointments

POST /api/appointments
Headers: Authorization (Bearer token)
Body: visitor, date

GET /api/appointments

PUT /api/appointments/:id

PUT /api/appointments/:id/approve

---

## Pass

POST /api/pass
Body: appointmentId

GET /api/pass

---


---

# API Documentation - Visitor Pass System

Base URL:
http://localhost:5000/api

---

## 🔐 Auth

### Login

POST /auth/login

Body:
```json
{
  "email": "test@example.com",
  "password": "123456"
}

## Notes

* Most routes require authentication
* Token should be sent in Authorization header
* Responses are in JSON format

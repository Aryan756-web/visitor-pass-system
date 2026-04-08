# API Documentation - Visitor Pass System

Base URL:
http://localhost:5000/api

---

## 🔐 Authentication

### Login

POST /auth/login

Request Body:

{
"email": "test@example.com
",
"password": "123456"
}


Response:

{
"token": "jwt_token"
}


---

## 👤 Visitors

### Get all visitors

GET /visitors

Headers:
Authorization: Bearer <token>

Response:
- List of visitors

---

### Add visitor

POST /visitors

Headers:
Authorization: Bearer <token>

Body:

{
"name": "Soham",
"email": "soham@example.com
"
}


---

### Delete visitor

DELETE /visitors/:id

Headers:
Authorization: Bearer <token>

---

## 📅 Appointments

### Create appointment

POST /appointments

Headers:
Authorization: Bearer <token>

Body:

{
"visitorId": "visitor_id",
"date": "2026-04-10T10:00:00.000Z"
}


---

### Get all appointments

GET /appointments

Headers:
Authorization: Bearer <token>

---

### Approve appointment

PUT /appointments/:id/approve

Headers:
Authorization: Bearer <token>

---

## 🎫 Pass

### Generate pass

POST /pass

Headers:
Authorization: Bearer <token>

Body:

{
"appointmentId": "appointment_id"
}


Response:
- Pass object
- QR code (base64)

---

### Get all passes

GET /pass

Headers:
Authorization: Bearer <token>

---

### Download pass PDF

GET /pass/pdf/:id

Headers:
Authorization: Bearer <token>

Response:
- PDF file download

---

## 📧 Email

- Triggered when pass is generated
- Uses Ethereal (test service)
- Preview URL appears in backend terminal

---

## ⚠️ Important Notes

- All routes (except login) require JWT token
- Token must be sent in Authorization header
- If token expires → 401 error
- Re-login required

---

## 🔁 Typical Flow

1. Login → get token  
2. Add visitor  
3. Create appointment  
4. Approve appointment  
5. Generate pass  
6. Download PDF  
7. Check email preview  

---

## 📌 Error Handling

- 400 → Bad request (missing data)
- 401 → Unauthorized (token issue)
- 404 → Not found
- 500 → Server error
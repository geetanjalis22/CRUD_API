# JWT Authentication API Documentation

## Introduction
This documentation outlines the API endpoints for a secure JWT-based authentication system. Each endpoint includes detailed request/response formats and testing instructions for effective integration.

## Base URL
```
http://localhost:8000
```

## Endpoints

### Register a New User
**URL:** `/api/auth/register`  
**Method:** `POST`  
**Headers:**
```
Content-Type: application/json
```
**Request Body:**
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}
```

---

### Login a User
**URL:** `/api/auth/login`  
**Method:** `POST`  
**Headers:**
```
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

---

### Access Protected Route (Dashboard)
**URL:** `/api/dashboard`  
**Method:** `GET`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Response:**
```json
{
  "message": "Welcome to the dashboard, <user_id>"
}
```

---

### Logout (Optional - Implement Token Blacklisting if Required)
**URL:** `/api/auth/logout`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Response:**
```json
{
  "message": "Logout successful"
}
```

---

## Token Details
- **`JWT_SECRET`** - Defined in `.env` file for security purposes.
- **`JWT_EXPIRES_IN`** - Recommended value: `30d` for a month-long session.

---

## Common Error Codes and Solutions
| **Status Code** | **Meaning** | **Solution** |
|-----------------|--------------|----------------|
| `400` | Bad Request | Check request body for missing/invalid fields. |
| `401` | Unauthorized | Ensure `Authorization` header contains `Bearer <token>`. |
| `403` | Forbidden | Token expired or tampered with. |
| `404` | Not Found | Verify the endpoint URL. |

---

## Testing Instructions Using Thunder Client
1. **Register User:** Select `POST /api/auth/register`, add body fields, and click **Send**.
2. **Login User:** Select `POST /api/auth/login`, copy the received `token`.
3. **Access Dashboard:** Select `GET /api/dashboard`, add the header: `Authorization: Bearer <YOUR_JWT_TOKEN>`, then click **Send**.

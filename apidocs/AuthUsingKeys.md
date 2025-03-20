# JWT Authentication API Documentation

## Introduction
This API provides secure authentication using JWT (JSON Web Tokens) with RSA public-private key encryption. It offers endpoints for user registration, login, and logout, along with token verification for protected routes.

## Authentication Flow
1. **User Registers/Logs In** → Receives JWT Token
2. **User Sends JWT in Authorization Header** → Accesses Protected Routes
3. **Logout** → Token invalidation via client-side removal (no Redis used)

---

## Endpoints

### **1. Register a New User**
**URL:** `/api/auth/register`  
**Method:** `POST`  
**Request Body:**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```
**Success Response:**
```json
{
    "message": "User registered successfully",
    "token": "<JWT_TOKEN>"
}
```

**Error Responses:**
- `400` Email already registered

---

### **2. Login a User**
**URL:** `/api/auth/login`  
**Method:** `POST`  
**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```
**Success Response:**
```json
{
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
}
```

**Error Responses:**
- `404` User not found  
- `400` Invalid credentials

---

### **3. Logout User**
**URL:** `/api/auth/logout`  
**Method:** `POST`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response:**
```json
{
    "message": "Logout successful"
}
```

**Error Responses:**
- `401` Unauthorized (missing or invalid token)

---

### **4. Verify Token (Protected Route Example)**
**URL:** `/api/protected`  
**Method:** `GET`  
**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```
**Success Response:**
```json
{
    "message": "Protected route accessed",
    "user": {
        "id": "user123",
        "email": "john@example.com"
    }
}
```

**Error Responses:**
- `401` Unauthorized (missing token)  
- `403` Forbidden (invalid token)

---

## Error Handling
| Status Code | Description               |
|--------------|---------------------------|
| `400`         | Bad Request                |
| `401`         | Unauthorized               |
| `403`         | Forbidden - Invalid Token  |
| `404`         | Resource Not Found         |

---

## Security Best Practices
Always use `https://` in production.  
Set a reasonable expiration time for tokens (`30d`, `2h`, etc.).  
Store private keys securely and never expose them publicly.  
Implement rate limiting to prevent abuse.  

---



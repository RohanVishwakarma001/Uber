# API Documentation for `/api/users/register`

## Endpoint: `/api/users/register`

This endpoint is used to register a new user in the system.

---

### **HTTP Method**

`POST`

---

### **Description**

This endpoint registers a new user by accepting their details such as first name, last name, email, and password. The data is validated before being processed. If successful, the user is saved to the database, and a JSON Web Token (JWT) is returned for authentication purposes.

---

### **Request Format**

**Content-Type:** `application/json`

#### **Request Body:**

The request body must include the following fields:

```json
{
  "fullName": {
    "firstName": "string (min 3 characters, required)",
    "lastName": "string (optional, min 3 characters)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

---

### **Validation Rules**

1. **Email:**
   - Must be a valid email format.
   - Required.
2. **Full Name (Object):**

   - **firstName:**
     - Minimum 3 characters.
     - Required.
   - **lastName:**
     - Minimum 3 characters.
     - Optional.

3. **Password:**
   - Minimum 6 characters.
   - Required.

---

### **Response**

#### **Success Response:**

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string"
    },
    "token": "string"
  }
  ```

#### **Error Responses:**

1. **Validation Errors:**

   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "errors": [
         {
           "msg": "Validation error message",
           "param": "field",
           "location": "body"
         }
       ]
     }
     ```

2. **Missing Required Fields:**

   - **Status Code:** `400 Bad Request`
   - **Response Body:**
     ```json
     {
       "error": "All fields are required"
     }
     ```

3. **Duplicate Email:**

   - **Status Code:** `409 Conflict`
   - **Response Body:**
     ```json
     {
       "error": "Email already exists"
     }
     ```

4. **Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "Internal server error"
     }
     ```

---

### **Example Requests**

#### **Request Body:**

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### **Example Response (Success):**

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "64c75dfc451d8b001c4e1df4",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3NWRmYzQ1MWQ4YjAwMWM0ZTFkZjQiLCJpYXQiOjE2ODAwMDQwMDB9.s1lWnJlO4X4EXVjxAER_pWvrp1FgWQVd7NxctQtrY5c"
  }
  ```

---

### **Notes**

- Ensure that the `Content-Type` header is set to `application/json`.
- Make sure to provide all required fields; otherwise, the endpoint will return a `400 Bad Request` error.
- Use the returned JWT token for authenticated requests to protected routes.
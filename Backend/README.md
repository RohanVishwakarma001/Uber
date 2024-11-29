# Backend API Documentation

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

## Endpoint: `/api/users/login`

This endpoint is used to authenticate a user and return a JWT token for accessing protected resources.

---

### **HTTP Method**

`POST`

---

### **Description**

This endpoint allows a user to log in by verifying their email and password. If authentication is successful, a JWT token is returned along with the user details.

---

### **Request Format**

**Content-Type:** `application/json`

#### **Request Body:**

The request body must include the following fields:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

---

### **Validation Rules**

1. **Email:**
   - Must be a valid email format.
   - Required.
2. **Password:**
   - Minimum 6 characters.
   - Required.

---

### **Response**

#### **Success Response:**

- **Status Code:** `200 OK`
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

2. **Invalid Email or Password:**

   - **Status Code:** `401 Unauthorized`
   - **Response Body:**
     ```json
     {
       "message": "Invalid email or password"
     }
     ```

3. **Server Error:**
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
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### **Example Response (Success):**

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "64c75dfc451d8b001c4e1df4",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "jfneubhabdiwjhdbbdhbeie7834t36buyt36eg3ycechb3i"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3NWRmYzQ1MWQ4YjAwMWM0ZTFkZjQiLCJpYXQiOjE2ODAwMDQwMDB9.s1lWnJlO4X4EXVjxAER_pWvrp1FgWQVd7NxctQtrY5c"
  }
  ```

---

### **Notes**

- Ensure that the `Content-Type` header is set to `application/json`.
- Make sure to provide a valid email and password. Incorrect credentials will return a `401 Unauthorized` error.
- Use the returned JWT token for authenticated requests to protected routes.

### Get User Profile

#### Endpoint:

`GET /api/users/profile`

#### Description:

Retrieve the profile details of the authenticated user.

#### Request:

**Headers:**

- `Authorization`: `Bearer <JWT token>` (Required)

#### Response:

##### Success Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "_id": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string"
  }
  ```

##### Error Responses:

1. **Unauthorized Access**

   - **Status Code:** `401 Unauthorized`
   - **Response Body:**
     ```json
     {
       "error": "Authentication required"
     }
     ```

2. **Server Error**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "Internal server error"
     }
     ```

#### Example Request:

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Response:**

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "_id": "64c75dfc451d8b001c4e1df4",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

---

### Logout User

#### Endpoint:

`POST /api/users/logout`

#### Description:

Logs out the authenticated user by invalidating their token and adding it to a blacklist.

#### Request:

**Headers:**

- `Authorization`: `Bearer <JWT token>` (Required)

**Cookies:**

- `token`: `JWT token` (Optional, if not using the `Authorization` header)

#### Response:

##### Success Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

##### Error Responses:

1. **Unauthorized Access**

   - **Status Code:** `401 Unauthorized`
   - **Response Body:**
     ```json
     {
       "error": "Authentication required"
     }
     ```

2. **Server Error**
   - **Status Code:** `500 Internal Server Error`
   - **Response Body:**
     ```json
     {
       "error": "Internal server error"
     }
     ```

#### Example Request:

**Headers:**

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

### Notes:

- Ensure that the `Authorization` header contains a valid JWT token or the `token` cookie is provided.
- Tokens are added to a blacklist upon logout, preventing reuse.

---

# User Management & Hobbies API

A RESTful API for managing users and their hobbies, supporting standard CRUD operations.  
**Author:** [Raji Mahmud Adeyemi](mailto:raji.mahmud.a@gmail.com) | [Contact on X](https://x.com/_Raji_Mahmud_)

---

## Table of Contents

- [Overview](#overview)
- [User Endpoints](#user-endpoints)
  - [GET /users](#get-users)
  - [POST /users](#post-users)
  - [GET /users/:id](#get-usersid)
  - [PATCH /users/:id](#patch-usersid)
  - [DELETE /users/:id](#delete-usersid)
- [Hobby Endpoints (Nested Resources)](#hobby-endpoints-nested-resources)
  - [GET /users/:userID/hobbies](#get-usersuserid-hobbies)
  - [POST /users/:userID/hobbies](#post-usersuserid-hobbies)
  - [GET /users/:id/hobbies/:hobbyID](#get-usersid-hobbieshobbyid)
  - [DELETE /users/:id/hobbies/:hobbyID](#delete-usersid-hobbieshobbyid)
- [General Error Handling](#general-error-handling)
- [Author & Contact](#author--contact)

---

## Overview

This API enables CRUD operations for user resources and their associated hobbies.  
All endpoints return JSON responses and use appropriate HTTP status codes for success and error states.

**Base URL:** _(Implied by server setup)_

---

## User Endpoints

### GET `/users`

Retrieve all users, optionally filter by age.

| Method | Path   | Action            |
|--------|--------|-------------------|
| GET    | /users | List all users or filter by age |

**Query Parameters:**

| Parameter | Type    | Required | Description                                  |
|-----------|---------|----------|----------------------------------------------|
| `age`     | integer | No       | Filters users by specified age               |

**Success Response:**  
`200 OK`
```json
{
  "success": true,
  "message": "Data gotten successfully",
  "data": [
    {
      "id": 4536,
      "unique-trait": "...",
      "name": "Ezenna Great",
      "username": "greatm3",
      "age": 18,
      "details": "...",
      "uniqueID": 1678886400000,
      "hobbies": [1]
    }
    // ... more user objects
  ]
}
```

**Error Response:**  
`400 Bad Request`  
Returned if `age` is not a valid number.
```json
{
  "success": false,
  "message": "Bad request",
  "details": "The parameter (age) is meant to be a number"
}
```

---

### POST `/users`

Create a new user.

| Method | Path   | Action      |
|--------|--------|-------------|
| POST   | /users | Create user |

**Request Body (JSON):**  
_All fields required_
```json
{
  "unique-trait": "A short, unique description of the user.",
  "name": "Full Name",
  "username": "unique_username",
  "age": 25,
  "details": "Longer text describing the user."
}
```

**Success Response:**  
`201 Created`  
Location header included.
```json
{
  "success": true,
  "message": "user created successfully",
  "data": {
    "id": 1234,
    "unique-trait": "...",
    "name": "New User",
    "username": "new_user",
    "age": 25,
    "details": "...",
    "uniqueID": 1678886400001,
    "hobbies": []
  }
}
```

**Error Response:**  
`400 Bad Request`  
Invalid JSON, missing fields, or empty body.

---

### GET `/users/:id`

Retrieve a single user by ID.

| Method | Path        | Action            |
|--------|-------------|-------------------|
| GET    | /users/:id  | Get user details  |

**Path Parameters:**

| Parameter | Type    | Required | Description              |
|-----------|---------|----------|--------------------------|
| `id`      | integer | Yes      | Unique user identifier   |

**Success Response:**  
`200 OK`  
Returns user object.

**Error Response:**  
`404 Not Found`  
If user does not exist.
```json
{
  "success": false,
  "message": "Not Found",
  "details": "User with the id \"1234\" is not found"
}
```

---

### PATCH `/users/:id`

Partially update a user.

| Method | Path        | Action            |
|--------|-------------|-------------------|
| PATCH  | /users/:id  | Update user fields|

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `id`      | integer | Yes      | User ID          |

**Request Body (JSON):**  
_Include any updatable field(s)_
```json
{
  "age": 26,
  "details": "Updated detail text."
}
```

**Success Response:**  
`200 OK`  
Returns updated user object.

**Error Responses:**

| Status      | Description                           |
|-------------|---------------------------------------|
| 404 Not Found | Resource ID not found                |
| 400 Bad Request | Invalid JSON or empty body         |

---

### DELETE `/users/:id`

Delete a user.

| Method | Path        | Action      |
|--------|-------------|-------------|
| DELETE | /users/:id  | Delete user |

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `id`      | integer | Yes      | User ID          |

**Success Response:**  
`200 OK`
```json
{
  "success": true,
  "message": "The resource was deleted successfully",
  "data": null
}
```

**Error Response:**  
`404 Not Found`  
If user does not exist.

---

## Hobby Endpoints (Nested Resources)

### GET `/users/:userID/hobbies`

List all hobby IDs for a user.

| Method | Path                | Action                      |
|--------|---------------------|-----------------------------|
| GET    | /users/:userID/hobbies | List user's hobby IDs      |

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `userID`  | integer | Yes      | User ID          |

**Success Response:**  
`200 OK`
```json
{
  "success": true,
  "message": "Data gotten successfully",
  "data": [1, 203, 88]
}
```

**Error Response:**  
`404 Not Found`  
If user does not exist.

---

### POST `/users/:userID/hobbies`

Create a new hobby for a user.

| Method | Path                | Action                    |
|--------|---------------------|---------------------------|
| POST   | /users/:userID/hobbies | Create and link hobby    |

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `userID`  | integer | Yes      | User ID          |

**Request Body (JSON):**
```json
{
  "hobby": "Learning new languages"
}
```

**Success Response:**  
`201 Created`
```json
{
  "success": true,
  "message": "hobby created successfully",
  "data": {
    "hobbyID": 1500,
    "userID": 4536,
    "hobby": "Learning new languages"
  }
}
```

**Error Responses:**

| Status         | Description                               |
|----------------|-------------------------------------------|
| 404 Not Found  | Specified userID does not exist           |
| 400 Bad Request| Invalid JSON, missing fields, empty body  |

---

### GET `/users/:id/hobbies/:hobbyID`

Get details of a specific hobby for a user.

| Method | Path                       | Action                   |
|--------|----------------------------|--------------------------|
| GET    | /users/:id/hobbies/:hobbyID| Get details of a hobby   |

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `id`      | integer | Yes      | User ID          |
| `hobbyID` | integer | Yes      | Hobby ID         |

**Success Response:**  
`200 OK`
```json
{
  "success": true,
  "message": "Data gotten successfully",
  "data": {
    "hobbyID": 1,
    "userID": 4536,
    "hobby": "Coding all the time"
  }
}
```

**Error Response:**  
`404 Not Found`  
If user, hobby, or association does not exist.

---

### DELETE `/users/:id/hobbies/:hobbyID`

Delete a hobby and its association from a user.

| Method | Path                       | Action                     |
|--------|----------------------------|----------------------------|
| DELETE | /users/:id/hobbies/:hobbyID| Delete user's hobby         |

**Path Parameters:**

| Parameter | Type    | Required | Description      |
|-----------|---------|----------|------------------|
| `id`      | integer | Yes      | User ID          |
| `hobbyID` | integer | Yes      | Hobby ID         |

**Success Response:**  
`200 OK`
```json
{
  "success": true,
  "message": "The resource was deleted successfully",
  "data": null
}
```

**Error Response:**  
`404 Not Found`  
If user, hobby, or association does not exist.

---

## General Error Handling

| Status Code         | Message                        | Context                                      |
|---------------------|-------------------------------|----------------------------------------------|
| 405 Method Not Allowed | Method not allowed          | HTTP method not supported for this endpoint  |
| 500 Internal Server Error | An internal Server Error Occurred | Server-side exception                   |
| 404 Not Found       | Not Found                     | Path does not match defined endpoint         |

> **Note:**  
> All successful responses: `success: true`  
> All errors: `success: false`, descriptive `message` and `details` fields.

---

## Author & Contact

- **Raji Mahmud Adeyemi**
- [Send Me An Email](mailto:raji.mahmud.a@gmail.com)
- [Contact me on X](https://x.com/_Raji_Mahmud_)

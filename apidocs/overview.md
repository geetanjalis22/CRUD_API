# API Documentation for CRUD Article Management API

## Overview
This documentation provides detailed information about the endpoints, request formats, and sample responses for the CRUD Article Management API built with TypeScript, ExpressJS, MongoDB, and Joi.

---
## Base URL
```
http://localhost:5000/api
```

---
## Endpoints

### 1. **Category Endpoints**

#### ➤ Create Category
**POST** `/categories`

**Request Body:**
```json
{
  "name": "Technology",
  "description": "All about tech"
}
```
**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "name": "Technology",
  "description": "All about tech"
}
```

#### ➤ Get All Categories
**GET** `/categories`

**Response:**
```json
[
  {
    "_id": "605c72b4f1f1c23a04d5f654",
    "name": "Technology",
    "description": "All about tech"
  }
]
```

#### ➤ Update Category
**PUT** `/categories/:id`

**Request Body:**
```json
{
  "name": "Updated Technology",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "name": "Updated Technology",
  "description": "Updated description"
}
```

#### ➤ Delete Category
**DELETE** `/categories/:id`

**Response:**
```json
{
  "message": "Category deleted successfully"
}
```

---
## 2. **Tag Endpoints**

#### ➤ Create Tag
**POST** `/tags`

**Request Body:**
```json
{
  "name": "Web Development",
  "description": "Front-end and back-end technologies"
}
```

**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "name": "Web Development",
  "description": "Front-end and back-end technologies"
}
```

#### ➤ Get All Tags
**GET** `/tags`

**Response:**
```json
[
  {
    "_id": "605c72b4f1f1c23a04d5f654",
    "name": "Web Development",
    "description": "Front-end and back-end technologies"
  }
]
```

#### ➤ Update Tag
**PUT** `/tags/:id`

**Request Body:**
```json
{
  "name": "Updated Tag",
  "description": "Updated tag details"
}
```

**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "name": "Updated Tag",
  "description": "Updated tag details"
}
```

#### ➤ Delete Tag
**DELETE** `/tags/:id`

**Response:**
```json
{
  "message": "Tag deleted successfully"
}
```

---
## 3. **Article Endpoints**

#### ➤ Create Article
**POST** `/articles`

**Request Body:**
```json
{
  "title": "Introduction to MongoDB",
  "description": "A comprehensive MongoDB guide",
  "body": "MongoDB is a NoSQL database...",
  "image_url": "https://example.com/image.jpg",
  "category": "605c72b4f1f1c23a04d5f654",
  "tags": ["605c72b4f1f1c23a04d5f654"]
}
```

**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "title": "Introduction to MongoDB",
  "description": "A comprehensive MongoDB guide",
  "category": "Technology",
  "tags": ["Database", "NoSQL"]
}
```

#### ➤ Get All Articles
**GET** `/articles`

**Response:**
```json
[
  {
    "_id": "605c72b4f1f1c23a04d5f654",
    "title": "Introduction to MongoDB",
    "description": "A comprehensive MongoDB guide",
    "category": "Technology",
    "tags": ["Database", "NoSQL"]
  }
]
```
---
## Added Feature: **Article Filter Endpoint**

### ➤ Get Articles by Filter
**GET** `/articles/getArticleByFilter`

**Query Parameters:**
| Parameter | Type   | Required | Description                                        |
|------------|--------|-----------|----------------------------------------------------|
| `category`  | String | Yes        | Category ID to filter articles by category          |
| `tags`      | String | No         | Comma-separated tag IDs to filter articles by tags  |

**Sample Request:**
```
GET /articles/getArticleByFilter?category=65fd8f6a1234567890abcde1&tags=65fd8f6a1234567890abcde2,65fd8f6a1234567890abcde3
```

**Sample Response:**
```json
[
  {
    "_id":"65fe1234567890abcdef123",
    "title":"The Future of AI",
    "description":"Exploring the advancements in AI technology.",
    "body":"Artificial Intelligence (AI) is transforming industries...",
    "image_url":"https://example.com/image.jpg",
    "category":"65fd8f6a1234567890abcde1",
    "tags":["65fd8f6a1234567890abcde2","65fd8f6a1234567890abcde3"],
    "createdAt":"2025-03-11T10:00:00Z",
    "id":"ART123",
    "date":"2025-03-11",
    "time":"10:00 AM",
    "name":"AI Innovations",
    "tagsMetadata": []
  },
  {
    "_id":"65fe9876543210abcdef987",
    "title":"Mastering TypeScript",
    "description":"A comprehensive guide to TypeScript best practices.",
    "body":"TypeScript is a strongly typed language...",
    "image_url":"https://example.com/typescript.jpg",
    "category":"65fd8f6a1234567890abcde1",
    "tags":["65fd8f6a1234567890abcde2","65fd8f6a1234567890abcde3"],
    "createdAt":"2025-03-12T09:00:00Z",
    "id":"ART456",
    "date":"2025-03-12",
    "time":"09:00 AM",
    "name":"TypeScript Insights",
    "tagsMetadata": []
  }
]
```

**Error Responses:**
- **404 Not Found:** If no articles match the specified criteria.
  ```json
  {
    "message": "No articles found matching the filters."
  }
  ```
- **500 Internal Server Error:** If there is an issue with the server or database query.
  ```json
  {
    "error": "Could not fetch articles",
    "details": "<error details>"
  }
  ```

**Usage Notes:**
- The `category` parameter is required to filter by a specific category.
- The `tags` parameter should include tag IDs separated by commas.
- The endpoint returns articles along with their metadata details such as title, description, and creation timestamps.




#### ➤ Update Article
**PUT** `/articles/:id`

**Request Body:**
```json
{
  "title": "Advanced MongoDB",
  "description": "In-depth MongoDB features"
}
```

**Response:**
```json
{
  "_id": "605c72b4f1f1c23a04d5f654",
  "title": "Advanced MongoDB",
  "description": "In-depth MongoDB features"
}
```

#### ➤ Delete Article
**DELETE** `/articles/:id`

**Response:**
```json
{
  "message": "Article deleted successfully"
}
```

---
## 4. **Error Handling**
- **400:** Bad Request (Validation errors or incorrect data format)
- **404:** Not Found (Resource doesn't exist)
- **500:** Internal Server Error (Unexpected server issues)

---
## 5. **Environment Variables (.env)**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@articlecluster.mongodb.net/node-typescript-app?retryWrites=true&w=majority
```

---
## 6. **Installation & Setup**
1. Clone the repository:
```
git clone <repo-link>
cd <project-folder>
```
2. Install dependencies:
```
npm install
```
3. Build the project:
```
npm run build
```
4. Start the server:
```
npm run dev
```
5. Test endpoints using Postman or any API testing tool.

---
## 7. **Tech Stack Used**
- **TypeScript**
- **ExpressJS**
- **MongoDB Atlas**
- **Mongoose**
- **Joi (Validation)**


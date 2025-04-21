# School Management API

A Node.js REST API for managing school data with proximity-based location sorting capabilities. This project allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Add School**: Create new school entries with name, address, and geographic coordinates
- **List Schools by Proximity**: Retrieve schools sorted by distance from a specified location
- **View All Schools**: Get a complete list of all schools in the database

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- dotenv (for environment variable management)

## Prerequisites

- Node.js (v14.x or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd school-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (for local development)

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Add School
- **URL**: `/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 Education St, Example City",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "success": true,
      "message": "School added successfully",
      "school": {
        "id": 1,
        "name": "Example School",
        "address": "123 Education St, Example City",
        "latitude": 37.7749,
        "longitude": -122.4194
      }
    }
    ```

### List Schools by Proximity
- **URL**: `/listSchool?latitude=37.7749&longitude=-122.4194`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "userLocation": {
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "count": 2,
      "schools": [
        {
          "id": 1,
          "name": "Example School",
          "address": "123 Education St, Example City",
          "latitude": 37.7749,
          "longitude": -122.4194,
          "distance": 0.00
        },
        {
          "id": 2,
          "name": "Another School",
          "address": "456 Learning Ave, Example City",
          "latitude": 37.8049,
          "longitude": -122.4294,
          "distance": 3.52
        }
      ]
    }
    ```

### Get All Schools
- **URL**: `/allSchools`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "success": true,
      "count": 2,
      "schools": [
        {
          "id": 1,
          "name": "Example School",
          "address": "123 Education St, Example City",
          "latitude": 37.7749,
          "longitude": -122.4194
        },
        {
          "id": 2,
          "name": "Another School",
          "address": "456 Learning Ave, Example City",
          "latitude": 37.8049,
          "longitude": -122.4294
        }
      ]
    }
    ```

## Database Schema

The application uses a `schools` table with the following structure:

| Column    | Type    | Description             |
|-----------|---------|-------------------------|
| id        | INT     | Primary Key (Auto-increment) |
| name      | VARCHAR | School name             |
| address   | VARCHAR | School address          |
| latitude  | FLOAT   | Geographic latitude     |
| longitude | FLOAT   | Geographic longitude    |

## Testing with Postman

A Postman collection is available for testing the API endpoints:

- **Postman Collection Link**: [School Management API Collection](https://www.postman.com/alpha6-2274/workspace/educase/collection/26439466-18898268-bb2a-4ff7-91c4-dfc613e5c95b?action=share&creator=26439466)

### Using the Deployed API
1. Import the collection into Postman
2. Use the base URL: `https://schoolmanagement-backend-oj1p.onrender.com`
3. Test the endpoints directly against the deployed version

### Using Local Development
1. Import the collection into Postman
2. Change the base URL to: `http://localhost:3000` (or your configured port)
3. Start your local server with `npm run dev`
4. Test the endpoints against your local instance

## Deployment

The API is deployed and accessible at:
- **Live API URL**: [https://schoolmanagement-backend-oj1p.onrender.com](https://schoolmanagement-backend-oj1p.onrender.com)

You can test the endpoints directly using this URL or through the provided Postman collection.

## License

This project is licensed under the ISC License.
# School Management API

A Node.js REST API for managing school data with proximity-based location sorting capabilities. This project allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
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

3. Set up environment variables:
   Create a `.env` file in the project root with the required configuration (see Environment Variables section).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The application supports multiple ways to configure database connections:

```
# Option 1: Connection URL
DATABASE_URL=mysql://username:password@hostname:port/database

# Option 2: Railway-specific connection URLs
MYSQL_PUBLIC_URL=mysql://username:password@hostname:port/database
MYSQL_URL=mysql://username:password@hostname:port/database

# Option 3: Individual connection parameters
DB_NAME=schooldb
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306

# Alternative naming for individual parameters (Railway-style)
MYSQLDATABASE=schooldb
MYSQLUSER=username
MYSQLPASSWORD=password
MYSQLHOST=localhost
MYSQLPORT=3306
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

1. Import the collection into Postman
2. Update the base URL to match your deployment
3. Use the provided example requests to test each endpoint

## Deployment

This application is designed to be easily deployed to various hosting platforms:

1. **Railway**:
   - The application automatically detects Railway environment variables
   - Connect your repository to Railway for automatic deployment

2. **Generic hosting**:
   - Set the required environment variables
   - Run `npm start` to start the application

3. **Local development**:
   - Set up local environment variables in a `.env` file
   - Run `npm run dev` to start the development server with hot reloading

## License

This project is licensed under the ISC License.
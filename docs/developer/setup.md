# Setup and Installation Instructions

This document provides instructions for setting up and running the Real-Time Chat Application for development.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [MySQL](https://www.mysql.com/) (v8 or later)
- [Docker](https://www.docker.com/) (optional, for containerized development)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd realTimeChatApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=chat_app

# Application Configuration
PORT=3000
```

Adjust the values according to your local environment.

### 4. Set Up the Database

You can set up the database in two ways:

#### Option 1: Using the Migration Script

Run the migration script to create the necessary tables:

```bash
node src/server/db/migration.js
```

#### Option 2: Using Docker

If you prefer to use Docker for the database, you can use the provided Docker Compose configuration:

```bash
docker-compose up -d mysql
```

### 5. Start the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Docker Development Setup

If you prefer to run the entire application in Docker, follow these steps:

### 1. Build and Start the Containers

```bash
docker-compose up -d
```

This will start both the MySQL database and the application.

### 2. Access the Application

The application should be accessible at `http://localhost:3000`.

## Production Deployment

For production deployment, refer to the [deployment.md](./deployment.md) document.

## Troubleshooting

### Common Issues

- **Database Connection Issues**: Ensure your MySQL server is running and the credentials in the `.env` file are correct.
- **Port Already in Use**: If port 3000 is already in use, you can change the `PORT` variable in the `.env` file.
- **Node.js Version Issues**: This application requires Node.js v14 or later. Check your Node.js version with `node -v`.

### Getting Help

If you encounter any issues not covered in this document, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information about the problem
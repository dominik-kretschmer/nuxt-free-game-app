# API Documentation

This directory contains the API documentation for the Real-Time Chat Application.

## Overview

The Real-Time Chat Application provides a RESTful API for authentication and managing favorite games.

## Authentication Endpoints

### POST /api/auth/login

Authenticates a user and creates a session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true
}
```

### POST /api/auth/register

Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true
}
```

**Error Responses:**
- 400 Bad Request: E-Mail und Passwort erforderlich
- 409 Conflict: User existiert bereits

## Favorite Games Endpoints

The application appears to have endpoints for managing favorite games, but further documentation is needed.
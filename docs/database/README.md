# Database Documentation

This directory contains documentation for the Real-Time Chat Application's database schema and relationships.

## Overview

The Real-Time Chat Application uses a MySQL database with the following tables:
- `user`: Stores user account information
- `user_fav_games`: Stores users' favorite games with a relationship to the user table

## Schema

### User Table

The `user` table stores user account information.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| email | VARCHAR(45) | User's email address, must be unique |
| password | VARCHAR(255) | User's password (Note: Should be hashed in production) |

### User Favorite Games Table

The `user_fav_games` table stores the relationship between users and their favorite games.

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key, auto-increment |
| fk_user_id | INT | Foreign key to the user table |
| game_id | INT | ID of the favorite game |

## Relationships

### User to User Favorite Games

- One-to-Many relationship
- A user can have multiple favorite games
- Each favorite game entry belongs to exactly one user
- Foreign key: `user_fav_games.fk_user_id` references `user.id`
- Cascade delete: When a user is deleted, all their favorite games entries are also deleted

## Entity-Relationship Diagram

```
+----------------+       +--------------------+
|     user       |       |   user_fav_games   |
+----------------+       +--------------------+
| id (PK)        |       | id (PK)            |
| email          |       | fk_user_id (FK)    |
| password       |       | game_id            |
+----------------+       +--------------------+
        |                        |
        |                        |
        +------------------------+
                 1:N
```

## Database Migration

The database schema is created and maintained through migration scripts located in `src/server/db/migration.js`. The current migration script drops existing tables and recreates them, which is suitable for development but not for production. In a production environment, proper versioned migrations should be implemented to preserve data.

## Future Improvements

As noted in the tasks.md file, several improvements are planned for the database:
- Implement database migrations with versioning instead of dropping tables
- Add more user fields to the user table (name, created_at, updated_at, etc.)
- Implement soft delete for entities instead of hard delete
- Add database transactions for operations that modify multiple records
- Implement pagination for database queries that return large result sets
- Add indexes to frequently queried columns for better performance
# TypeScript Types and Interfaces

This document provides an overview of the TypeScript types and interfaces used in the Real-Time Chat Application.

## Database Entities

The application uses TypeScript interfaces to define the structure of database entities. These interfaces are defined in `src/types/database.ts`.

### Entity

The base interface for all database entities:

```typescript
export interface Entity {
  id: number;
  [key: string]: unknown;
}
```

This interface defines the common properties that all entities should have, such as an `id`. It also includes an index signature to allow for dynamic properties.

### User

Interface for the user entity:

```typescript
export interface User {
  id: number;
  email: string;
  password: string;
}
```

This interface defines the structure of a user in the database, with properties for `id`, `email`, and `password`.

### UserFavGame

Interface for the user favorite games entity:

```typescript
export interface UserFavGame {
  id: number;
  fk_user_id: number;
  game_id: number;
}
```

This interface defines the structure of a user's favorite game in the database, with properties for `id`, `fk_user_id` (foreign key to the user table), and `game_id`.

### QueryResult

Type for database query results:

```typescript
export type QueryResult = {
  affectedRows?: number;
  insertId?: number;
  changedRows?: number;
};
```

This type defines the structure of the result returned by database operations, with optional properties for `affectedRows`, `insertId`, and `changedRows`.

## Authentication

The application uses TypeScript interfaces for authentication requests and responses. These interfaces are defined in `src/types/auth.ts`.

### LoginRequest

Interface for login request body:

```typescript
export interface LoginRequest {
  email: string;
  password: string;
}
```

This interface defines the structure of a login request, with properties for `email` and `password`.

### RegisterRequest

Interface for registration request body:

```typescript
export interface RegisterRequest {
  email: string;
  password: string;
}
```

This interface defines the structure of a registration request, with properties for `email` and `password`.

### AuthResponse

Interface for authentication response:

```typescript
export interface AuthResponse {
  success: boolean;
}
```

This interface defines the structure of an authentication response, with a property for `success` indicating whether the authentication was successful.

## Using TypeScript Types in the Application

The application uses these TypeScript types and interfaces throughout the codebase to ensure type safety and improve code quality.

### BaseModel

The `BaseModel` class is a generic class that uses the `Entity` interface as a type parameter:

```typescript
export class BaseModel<T extends Entity> {
  // ...
}
```

This allows the class to work with any entity type that extends the `Entity` interface.

### UserEntity

The `UserEntity` class extends `BaseModel` with the `User` type:

```typescript
export class UserEntity extends BaseModel<User> {
  // ...
}
```

This ensures that the `UserEntity` class works specifically with the `User` entity type.

### API Endpoints

The API endpoints use the authentication interfaces to ensure type safety:

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody<LoginRequest>(event)
  // ...
  return { success: true } as AuthResponse
})
```

This ensures that the request body has the correct structure and that the response conforms to the expected format.
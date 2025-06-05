import { UserEntity } from '../../db/entities/UserEntity'
import { RegisterRequest, AuthResponse } from '../../../types/auth'
import { User } from '../../../types/database'

/**
 * @todo Implement password hashing using bcrypt or Argon2
 * @todo Add JWT-based authentication instead of insecure cookie-based authentication
 * @todo Set secure and httpOnly flags on cookies
 * @todo Add CSRF protection for authentication endpoints
 * @todo Implement rate limiting for authentication endpoints to prevent brute force attacks
 * @todo Add more comprehensive input validation and sanitization
 * @todo Implement proper error handling with secure error messages
 */

export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterRequest>(event)
    const { email, password } = body

    if (!email || !password) {
        return sendError(event, createError({ 
            statusCode: 400, 
            message: 'E-Mail und Passwort erforderlich' 
        }))
    }

    const userEntity = new UserEntity()
    const existing = await userEntity.findByEmail(email)
    if (existing) {
        return sendError(event, createError({ 
            statusCode: 409, 
            message: 'User existiert bereits' 
        }))
    }

    await userEntity.create({ 
        email, 
        password: password 
    } as Partial<User>)

    return { success: true } as AuthResponse
})

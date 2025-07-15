import {UserEntity} from '../../db/entities/UserEntity'
import {AuthResponse, RegisterRequest} from '~/types/auth'
import {User} from '~/types/database'
import {hashPassword} from "~/composables/hashHandler";
import {generateToken} from "~/composables/jwtHandler";

/**
 * @todo Add CSRF protection for authentication endpoints
 * @todo Implement rate limiting for authentication endpoints to prevent brute force attacks
 * @todo Add more comprehensive input validation and sanitization
 */

export default defineEventHandler(async (event) => {
    const body :RegisterRequest = await readBody<RegisterRequest>(event)
    const {email, password} = body

    if (!email || !password) {
        return sendError(event, createError({
            statusCode: 400,
            message: 'E-Mail und Passwort erforderlich'
        }))
    }

    const userEntity: UserEntity = new UserEntity()
    const existing = await userEntity.findByEmail(email)
    if (existing) {
        return sendError(event, createError({
            statusCode: 409,
            message: 'User existiert bereits'
        }))
    }
    const hash: string = await hashPassword(password);
    const result = await userEntity.create({
        email,
        password: hash
    } as Partial<User>)

    const userId = result.insertId
    const token = generateToken(userId)

    return {success: true, token, userId} as AuthResponse
})

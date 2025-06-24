import {UserEntity} from '../../db/entities/UserEntity'
import {AuthResponse, LoginRequest} from '~/types/auth'
import {comparePassword} from "~/composables/hashHandler";
import {generateToken} from "~/composables/jwtHandler";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginRequest>(event)
    const user = await loginUser(body)
    if (user) {
        const token = generateToken(user.id)
        return {success: true, token, userId: user.id} as AuthResponse
    } else {
        return {success: false} as AuthResponse
    }
})

/**
 * @todo Implement JWT or secure session management
 * @todo Add CSRF protection for authentication endpoints
 * @todo Implement rate limiting for authentication endpoints to prevent brute force attacks
 * @todo Add input validation and sanitization for user inputs
 */

async function loginUser(body: LoginRequest): Promise<any> {
    const {email, password} = body;
    const userEntity = new UserEntity();
    const user = await userEntity.findByEmail(email);

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'no user found',
        });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
        });
    }
    return user;
}

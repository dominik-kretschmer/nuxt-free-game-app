import { UserEntity } from '../../db/entities/UserEntity'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        return sendError(event, createError({ statusCode: 400, message: 'E-Mail und Passwort erforderlich' }))
    }

    const userEntity = new UserEntity()
    const existing = await userEntity.findByEmail(email)
    if (existing) {
        return sendError(event, createError({ statusCode: 409, message: 'User existiert bereits' }))
    }

    await userEntity.create({ email, password: password })

    return { success: true }
})

import { Favorites } from '~/server/db/entities/favorites'
import {extractUserIdFromToken} from "~/composables/jwtHandler"


export default  defineEventHandler(async(event) => {
    const body = await readBody<{ token: string}>(event)
    if (!body.token) {
        throw createError({
            statusCode: 401,
            message: event.context.auth
        })
    }

    const fav = new Favorites();
    const userId =  extractUserIdFromToken(body.token)
    const favorites = fav.getAll()

    return { favorites }
})

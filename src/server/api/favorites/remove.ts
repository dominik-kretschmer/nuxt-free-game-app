import {Favorites} from '~/server/db/entities/favorites'
import {extractUserIdFromToken} from "~/composables/jwtHandler"

export default defineEventHandler(async (event) => {

    const body = await readBody<{ gameId: string , token: string}>(event)
    if (!body.gameId || !body.token) {
        throw createError({
            statusCode: 401,
            message: 'Game ID and token is required'
        })
    }
    const userId =  extractUserIdFromToken(body.token)

    const fav = new Favorites();
    await fav.removeFavorite(userId, body.gameId);
    return {success: true}
})

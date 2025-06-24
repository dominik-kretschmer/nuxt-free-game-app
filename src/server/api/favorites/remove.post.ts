import {Favorites} from '~/server/db/entities/favorites'

export default defineEventHandler(async (event) => {

   /* if (!userId) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized - User ID not found'
        })
    }*/

    const body = await readBody<{ gameId: string }>(event)

    if (!body.gameId) {
        throw createError({
            statusCode: 400,
            message: 'Game ID is required'
        })
    }

    const fav = new Favorites();
/*
    fav.removeFavorite(userId, body.gameId)
*/

    return {success: true}
})

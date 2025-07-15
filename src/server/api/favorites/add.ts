import {Favorites} from '~/server/db/entities/favorites'

export default defineEventHandler(async (event) => {

    const body = await readBody<{ gameId: string }>(event)
    if (!body.gameId) {
        throw createError({
            statusCode: 400,
            message: 'Game ID is required'
        })
    }

    const fav = new Favorites();
    fav.addFavorite(userId, body.gameId);
    return {success: true}
})

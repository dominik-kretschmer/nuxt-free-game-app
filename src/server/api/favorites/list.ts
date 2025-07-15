import { Favorites } from '~/server/db/entities/favorites'

export default defineEventHandler((event) => {

    if (!userId) {
        throw createError({
            statusCode: 401,
            message: event.context.auth
        })
    }

    const fav = new Favorites();
    const favorites = fav.listFavorites(userId)

    return { favorites }
})

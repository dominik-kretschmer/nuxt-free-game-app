import { Favorites } from '~/server/db/entities/favorites'

export default defineEventHandler((event) => {
    // Get the user ID from the event context (set by auth middleware)
    const userId = event.context.auth?.userId.toString()

    if (!userId) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized - User ID not found'
        })
    }

    const fav = new Favorites();
    const favorites = fav.listFavorites(userId)

    return { favorites }
})

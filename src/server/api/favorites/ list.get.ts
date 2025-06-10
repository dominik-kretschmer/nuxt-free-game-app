import { Favorites } from '~/server/db/entities/favorites'

export default defineEventHandler((event) => {
    const userId = getQuery(event).userId as string

    const favorites = Favorites.listFavorites(userId)

    return { favorites }
})

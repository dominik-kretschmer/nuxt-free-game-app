import { Favorites } from '~/server/db/entities/favorites'
export default defineEventHandler(async (event) => {
    const body = await readBody<{ userId: string; gameId: string }>(event)

    Favorites.removeFavorite(body.userId, body.gameId)

    return { success: true }
})

import pool from '../pool'
import { BaseModel } from './BaseModel'
import {UserFavGame} from '~/types/database'

const favorites = new Map<string, Set<string>>()

export class Favorites extends BaseModel<UserFavGame> {
    constructor() {
        super('favorites')
    }

    addFavorite(userId: string, gameId: string) {
        if (!favorites.has(userId)) {
            favorites.set(userId, new Set())
        }
        favorites.get(userId)!.add(gameId)
    }

    removeFavorite(userId: string, gameId: string) {
        favorites.get(userId)?.delete(gameId)
    }

    listFavorites(userId: string): string[] {
        return Array.from(favorites.get(userId) ?? [])
    }
}

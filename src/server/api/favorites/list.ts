import { Favorites } from '~/server/db/entities/favorites';
import { extractUserIdFromToken } from "~/composables/jwtHandler";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ token: string }>(event);
  if (!body.token) {
    throw createError({
      statusCode: 401,
      message: event.context.auth
    });
  }

  const fav = new Favorites();
  const userId = extractUserIdFromToken(body.token);
  const favorites = await fav.getAllByUserId(userId);

  const gameIds = favorites.map(fav => fav.game_id);

  if (gameIds.length === 0) {
    return [];
  }

  const games = [];

  for (const gameId of gameIds) {
    const detailUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const response = await $fetch(detailUrl, {
      headers: {
        'X-RapidAPI-Key': 'f1068a6948msh1132fe7de0dfa87p10ba70jsna609dd83ba41',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    });

    if (response) {
      games.push({
        id: gameId,
        title: response.title,
        image: response.thumbnail
      });
    }
  }

  return games;
});

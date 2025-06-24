<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Use the auth composable for authentication
const { isLoggedIn, userId, fetchWithAuth } = useAuth();
const favorites = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Function to fetch favorite games
async function fetchFavorites() {
  // Only fetch favorites if user is logged in
  if (!isLoggedIn.value) {
    favorites.value = [];
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    // Fetch the list of favorite game IDs using authenticated request
    const response = await fetchWithAuth('/api/favorites/list');

    if (!response?.favorites || !response.favorites.length) {
      favorites.value = [];
      loading.value = false;
      return;
    }

    // For each favorite game ID, fetch the game details
    const gamePromises = response.favorites.map(async (gameId: string) => {
      const detailUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;

      const { data } = await useFetch(detailUrl, {
        headers: {
          'X-RapidAPI-Key': 'f1068a6948msh1132fe7de0dfa87p10ba70jsna609dd83ba41',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });

      return data.value;
    });

    const gameResults = await Promise.all(gamePromises);
    favorites.value = gameResults.filter(Boolean).map(game => ({
      id: game.id,
      title: game.title,
      image: game.thumbnail
    }));
  } catch (e) {
    error.value = e.message || 'Failed to load favorite games';
    console.error('Error fetching favorites:', e);
  } finally {
    loading.value = false;
  }
}

// Remove a game from favorites
async function removeFavorite(gameId: string) {
  // Require login to remove favorites
  if (!isLoggedIn.value) {
    error.value = 'You must be logged in to manage favorites';
    return;
  }

  try {
    await fetchWithAuth('/api/favorites/remove', {
      method: 'POST',
      body: { gameId }
    });

    // Refresh the favorites list
    await fetchFavorites();
  } catch (e) {
    console.error('Error removing favorite:', e);
    error.value = 'Failed to remove game from favorites';
  }
}

// Fetch favorites when component is mounted
onMounted(fetchFavorites);
</script>

<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-6">Meine Favoriten</h1>

    <!-- Show login prompt if user is not logged in -->
    <v-alert v-if="!isLoggedIn" type="info" class="mb-4">
      Bitte <NuxtLink to="/auth/login">melde dich an</NuxtLink>, um deine Favoriten zu sehen.
    </v-alert>

    <div v-else-if="loading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Lade Favoriten...</p>
    </div>

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-row v-else-if="favorites && favorites.length > 0">
      <v-col
        v-for="game in favorites"
        :key="game.id"
        cols="12"
        sm="6"
        md="4"
        class="pa-2"
      >
        <v-card
          elevation="2"
          rounded="xl"
          class="pa-3"
          hover
        >
          <v-img
            :src="game.image"
            :alt="game.title"
            height="200"
            cover
            class="rounded-lg mb-2"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>

          <div class="d-flex align-center">
            <v-card-title class="text-h6 font-weight-medium">
              {{ game.title }}
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="removeFavorite(game.id)" color="red" variant="text">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon :to="`/games/${game.id}`" color="primary" variant="text">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info">
      Du hast noch keine Favoriten. Gehe zur <NuxtLink to="/games">Spieleliste</NuxtLink>, um Spiele zu deinen Favoriten hinzuzufügen.
    </v-alert>
  </v-container>
</template>

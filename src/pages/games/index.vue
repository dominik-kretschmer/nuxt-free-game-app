<script setup lang="ts">

const apiUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description?: string;
  genre?: string;
  platform?: string;
}

const { data, pending, error } = await useFetch<Game[]>(apiUrl, {
  headers: {
    'X-RapidAPI-Key': 'f1068a6948msh1132fe7de0dfa87p10ba70jsna609dd83ba41',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
   },
  default: () => []
});

 const games = computed(() => {
   if (data.value) {
     return data.value.map(game => ({
      id: game.id,
      title: game.title,
       image: game.thumbnail,
     }));
  }
   return [];
 });
</script>

<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-6">Spieleliste</h1>

    <div v-if="pending" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Lade Spiele...</p>
    </div>

    <v-alert v-else-if="error" type="error" class="mb-4">
      Fehler beim Laden der Spiele: {{ error.message }}
    </v-alert>

    <v-row v-else-if="games && games.length > 0">
      <v-col
        v-for="game in games"
        :key="game.id"
        cols="12"
        sm="6"
        md="4"
        class="pa-2"
      >
        <v-card
          :to="`/games/${game.id}`"
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
          <v-card-title class="text-h6 font-weight-medium">
            {{ game.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-else type="info">
      Keine Spiele gefunden.
    </v-alert>
  </v-container>
</template>

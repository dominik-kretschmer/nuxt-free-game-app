<script setup lang="ts">
const route = useRoute()
const gameId = parseInt(route.params.id as string)
const detailUrl=`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description?: string;
  genre?: string;
  platform?: string;
}

const { data, pending, error } = await useFetch<Game[]>(detailUrl, {
  headers: {
    'X-RapidAPI-Key': 'f1068a6948msh1132fe7de0dfa87p10ba70jsna609dd83ba41',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  },
  default: () => []
});

const game = computed(() => {
  if (data.value) {
    return{
      id: data.value.id,
      title: data.value.title,
      image: data.value.thumbnail,
    }
  }
  return [];
});

function addFav(){
  console.log("added fav ", gameId)
}

</script>
<template>
  <v-container class="pa-6">
    <v-btn to="/games" variant="text" color="primary" prepend-icon="mdi-arrow-left">Zurück</v-btn>
    <v-card v-if="game" class="mt-4 pa-4" variant="flat">
      <v-img :src="game.image" :alt="game.title" class="rounded-xl mb-4" max-width="600" >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
                color="grey-lighten-4"
                indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
      <v-card-title class="text-h4 font-weight-bold">{{ game.title }}</v-card-title>
      <v-btn icon @click="addFav" color="grey" variant="text" class="ml-2">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card>
    <v-alert v-else type="error" class="mt-4">Spiel nicht gefunden</v-alert>
  </v-container>
</template>

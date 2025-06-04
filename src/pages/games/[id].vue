<script setup lang="ts">
const route = useRoute()
const gameId = parseInt(route.params.id as string)

const games = [
  {
    id: 1,
    title: 'The Legend of Zelda: Breath of the Wild',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0b/The_Legend_of_Zelda_Breath_of_the_Wild.jpg'
  },
  {
    id: 2,
    title: 'Elden Ring',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg'
  },
  {
    id: 3,
    title: 'Hollow Knight',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg'
  }
]
function addFav(){
  console.log("added fav ", gameId)
}
const game = games.find(g => g.id === gameId)
</script>
<template>
  <div class="p-6">
    <NuxtLink to="/games" class="text-blue-600 hover:underline">&larr; Zurück</NuxtLink>
    <div v-if="game" class="mt-4">
      <img :src="game.image" :alt="game.title" class="w-full max-w-xl rounded-2xl shadow mb-4"/>
      <h1 class="text-3xl font-bold">{{ game.title }}</h1>
      <button @click="addFav" class="text-white-500 hover:text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"  viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button>
    </div>
    <div v-else class="text-red-500">Spiel nicht gefunden</div>
  </div>
</template>





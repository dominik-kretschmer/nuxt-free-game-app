<script setup lang="ts">
const games = ref([
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
])
</script>
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Spieleliste</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <NuxtLink
          v-for="game in games"
          :key="game.id"
          :to="`/games/${game.id}`"
          class="block bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
      >
        <img
            :src="game.image"
            :alt="game.title"
            class="w-full h-48 object-cover rounded-xl mb-2"
        />
        <h2 class="text-xl font-semibold">{{ game.title }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>






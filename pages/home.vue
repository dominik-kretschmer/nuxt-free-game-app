<script setup lang="ts">
</script>
<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
    <div class="text-center p-8 max-w-xl">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-4">Willkommen auf der Startseite</h1>
      <p class="text-lg text-gray-700 mb-6">
        Schön, dass du da bist! Entdecke unsere Funktionen und starte dein Erlebnis mit nur einem Klick.
      </p>
      <div class="flex justify-center space-x-4">
        <nuxt-link href="/login" class="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-300">
          Einloggen
        </nuxt-link>
        <nuxt-link href="/register" class="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-300">
          Registrieren
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

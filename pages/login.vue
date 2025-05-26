<script setup lang="ts">

</script>
<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">E-Mail-Adresse</label>
          <input type="email" id="email" name="email" required
                 class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Passwort</label>
          <input type="password" id="password" name="password" required
                 class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        <button type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Einloggen
        </button>
      </form>
      <p class="mt-4 text-center text-sm text-gray-500">
        Noch kein Konto?
        <nuxt-link href="/register" class="text-blue-600 hover:underline">Jetzt registrieren</nuxt-link>
      </p>
    </div>
  </section>
</template>


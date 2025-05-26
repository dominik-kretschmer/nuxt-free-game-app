<script setup lang="ts">

</script>
<template>
  <p>HAlasjdklöjsdfkl</p>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
    <main class="flex items-center justify-center p-8">
      <div class="bg-gray-850 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-mint-500 mb-6">Registrieren</h2>
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300">Name</label>
            <input type="text" id="name" name="name" required
                   class="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">E-Mail-Adresse</label>
            <input type="email" id="email" name="email" required
                   class="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">Passwort</label>
            <input type="password" id="password" name="password" required
                   class="mt-1 block w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint-500">
          </div>
          <button type="submit"
                  class="w-full bg-mint-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-mint-600 transition-colors duration-300">
            Registrieren
          </button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-400">
          Bereits ein Konto?
          <nuxt-link href="/login" class="text-mint-500 hover:underline">Jetzt einloggen</nuxt-link>
        </p>
      </div>
    </main>
  </div>
</template>

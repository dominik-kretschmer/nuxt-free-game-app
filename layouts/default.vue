<template>
  <div>
    <header class="sticky top-0 z-50 bg-gray-850 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-xl font-bold text-mint-500">Meine App</h1>
      <nav class="space-x-4">
        <nuxt-link to="/home" class="text-gray-300 hover:text-mint-500">Home</nuxt-link>
        <nuxt-link to="/login" class="text-gray-300 hover:text-mint-500">Login</nuxt-link>
        <nuxt-link to="/register" class="text-gray-300 hover:text-mint-500">Registrieren</nuxt-link>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">


</script>
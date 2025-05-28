<script setup >
import {routes} from "~/config/page-routes";
</script>
<template>
  <div>
    <header class="sticky top-0 z-50  bg-primary shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-xl font-heading text-soft">Meine App</h1>
      <nav class="space-x-4">
        <nuxt-link :to=routes.home class="text-base hover:text-soft">Home</nuxt-link>
        <nuxt-link :to=routes.login class="text-base hover:text-soft">Login</nuxt-link>
        <nuxt-link :to=routes.register class="text-base hover:text-soft">Registrieren</nuxt-link>
      </nav>
    </header>
    <div class="min-h-screen bg-primary font-sans text-base ">
      <slot></slot>
    </div>
    <footer class="bg-accent text-soft py-6 font-sans">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-sm">&copy; 2025 Dein Unternehmen. Alle Rechte vorbehalten.</p>
          <div class="flex space-x-6">
            <nuxt-link to="#" class="hover:underline transition">Impressum</nuxt-link>
            <nuxt-link to="#" class="hover:underline transition">Datenschutz</nuxt-link>
            <nuxt-link to="#" class="hover:underline transition">Kontakt</nuxt-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>



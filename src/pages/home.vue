<script setup lang="ts">
import {routes} from "~/config/page-routes";

</script>
<template>
  <section class="min-h-screen flex items-center justify-center background-primary font-sans">
    <div class="text-center p-8 max-w-xl bg-soft rounded-2xl shadow-md">
      <h1 class="text-4xl font-heading text-base mb-4">Willkommen auf der Startseite</h1>
      <p class="text-lg text-secondary mb-6">
        Schön, dass du da bist! Entdecke unsere Funktionen und starte dein Erlebnis mit nur einem Klick.
      </p>
      <div class="flex justify-center space-x-4">
        <nuxt-link :to="routes.login" class="bg-accent text-soft px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-colors duration-300">
          Einloggen
        </nuxt-link>
        <nuxt-link :to="routes.register"  class="bg-soft border border-accent text-accent px-6 py-2 rounded-xl font-medium hover:bg-primary/10 transition-colors duration-300">
          Registrieren
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

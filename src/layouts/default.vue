<script setup >
import {routes} from "~/config/page-routes";
</script>
<template>
  <v-app>
    <v-app-bar app elevation="2" color="primary">
      <v-app-bar-title>leck meine eier drecks nuxt</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn :to="routes.home" text>Home</v-btn>
      <v-btn :to="routes.login" text>Login</v-btn>
      <v-btn :to="routes.register" text>Registrieren</v-btn>
      <v-btn :to="routes.games" text>Games</v-btn>
      <v-btn :to="routes.favorites" text>
        <v-icon class="mr-1">mdi-heart</v-icon>
        Favoriten
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer app color="primary" class="py-3">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <div class="text-body-2">&copy; 2025 Dein Unternehmen. Alle Rechte vorbehalten.</div>
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <v-btn to="#" text variant="plain" class="mx-2">Impressum</v-btn>
            <v-btn to="#" text variant="plain" class="mx-2">Datenschutz</v-btn>
            <v-btn to="#" text variant="plain" class="mx-2">Kontakt</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

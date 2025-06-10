<script setup lang="ts">
import {routes} from "~/config/page-routes";

</script>
<template>
  <v-container fluid class="d-flex align-center" style="height: 100vh;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-6" elevation="4" rounded="xl">
          <v-card-title class="text-h4 font-weight-bold mb-4">Willkommen auf der Startseite</v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-6">
              Schön, dass du da bist! Entdecke unsere Funktionen und starte dein Erlebnis mit nur einem Klick.
            </p>
            <v-row justify="center" class="mt-4">
              <v-col cols="auto" class="pa-2">
                <v-btn
                  :to="routes.login"
                  color="primary"
                  size="large"
                  rounded
                >
                  Einloggen
                </v-btn>
              </v-col>
              <v-col cols="auto" class="pa-2">
                <v-btn
                  :to="routes.register"
                  color="secondary"
                  size="large"
                  rounded
                  variant="outlined"
                >
                  Registrieren
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

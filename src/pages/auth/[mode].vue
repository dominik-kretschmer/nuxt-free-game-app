<script setup lang="ts">
import {routes} from "~/config/page-routes";
import AccountForm from "../../components/accountForm.vue";

const mode = computed(() => {
  const m = useRoute().params.mode as string
  return m === 'register' || m === 'login' ? m : 'login';
})
const configs = {
  register: {
    headline: 'Registrieren',
    link: routes.login,
    footerText: 'Bereits ein Konto?',
    linkText: 'Jetzt einloggen',
  },
  login: {
    headline: 'Login',
    link: routes.register,
    footerText: 'Noch kein Konto?',
    linkText: 'Jetzt registrieren',
  },
}
const config = computed(() => configs[mode.value])

</script>

<template>
  <v-container fluid class="d-flex align-center" style="height: 100vh;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="4" rounded="xl">
          <v-card-title class="text-h5 text-center mb-4">
            {{ config.headline }}
          </v-card-title>
          <v-card-text>
            <account-form :mode="config.headline" />
            <div class="text-center mt-4">
              <span class="text-body-2">{{ config.footerText }}</span>
              <v-btn
                :to="config.link"
                variant="text"
                color="primary"
                density="comfortable"
                class="ml-1"
              >
                {{ config.linkText }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

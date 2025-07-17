<script setup lang="ts">
import { useUserStore } from "~/stores/userId.ts"

const userIdStore = useUserStore();
const props = defineProps(['mode']);
const email = ref('');
const password = ref('');

async function auth() {
  const endpoint = props.mode === "Login" ? "login" : "register"
  const data = await $fetch(`/api/auth/${endpoint}`, {
    method: 'POST',
    body: { email: email.value, password: password.value }
  })
  if (data.success && data.token) {
    userIdStore.setToken(data.token);
  }
}

const logout = () => {
  userIdStore.clearToken();
}

const userName = computed(() => {
  return email.value
})

const isUserLoggedIn = computed(() => {
  return userIdStore.getToken !== null
})
</script>

<template>
  <p>{{ isUserLoggedIn }}</p>
  <v-container v-if="!isUserLoggedIn" style="height: 50%;">
    <v-form class="mt-4" @submit.prevent="auth">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="E-Mail-Adresse"
            type="email"
            required
            variant="outlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            label="Passwort"
            type="password"
            required
            variant="outlined"
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            type="submit"
            color="primary"
            block
            class="mt-2"
          >
            Senden
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p class="text-secondary mb-4">Du bist angemeldet als: {{ userName }}</p>
            <v-btn
              @click="logout"
              color="primary"
              block
            >
              Abmelden
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

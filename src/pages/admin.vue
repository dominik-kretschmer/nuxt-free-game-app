<script setup lang="ts">
const user = useCookie<{ email: string } | null>('user')
const logins = useCookie<number>('logins')
const email = ref('')

function login() {
  if (email.value) {
    user.value = { email: email.value }
    logins.value = (logins.value || 0) + 1
    email.value = ''
  }
}

function logout() {
  user.value = null
}
</script>

<template>
  <v-container class="d-flex align-center" style="height: 100vh;">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6" elevation="4">
          <template v-if="user">
            <v-card-title class="text-h4 mb-3">
              Welcome, {{ user.email }}! 👋
            </v-card-title>
            <v-card-text>
              <v-alert
                type="info"
                color="primary"
                class="mb-4"
              >
                You have logged in <b>{{ logins }} times</b>!
              </v-alert>

              <v-btn
                color="warning"
                prepend-icon="mdi-arrow-left"
                @click="logout"
                class="mt-3"
              >
                Log out
              </v-btn>
            </v-card-text>
          </template>
          <template v-else>
            <v-card-title class="text-h4 mb-3">
              Login
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Enter your name..."
                variant="outlined"
                @keyup.enter="login()"
              ></v-text-field>

              <v-btn
                color="primary"
                prepend-icon="mdi-account"
                :disabled="!email"
                @click="login"
                class="mt-3"
              >
                Log in
              </v-btn>
            </v-card-text>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

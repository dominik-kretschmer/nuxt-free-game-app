<script setup lang="ts">

/**
 * @todo Add proper JWT-based authentication instead of insecure cookie-based authentication
 * @todo Implement form validation with meaningful error messages
 * @todo Add loading indicators for asynchronous operations
 * @todo Add proper error handling and user feedback for failed operations
 * @todo Implement accessibility improvements (ARIA attributes, keyboard navigation)
 */

const props = defineProps(['mode'])
const email :string = ref('')
const password :string = ref('')

// Use the auth composable
const { isLoggedIn, userEmail, setAuth, clearAuth } = useAuth()

async function auth() {
  const endpoint = props.mode === "Login" ? "login" : "register"

  try {
    const data = await $fetch(`/api/auth/${endpoint}`, {
      method: 'POST',
      body: {email: email.value, password: password.value}
    })
    if (data.success && data.token && data.userId) {
      setAuth(data.token, data.userId, email.value)
    } else {
      console.error('Authentication failed')
    }
  } catch (error) {
    console.error(error)
  }
}

const logout = () => {
  clearAuth()
}

const userName = computed(() => {
  return userEmail.value || email.value
})

</script>
<template>
  <v-container v-if="!isLoggedIn" style="height: 50%;">
    <v-form @submit.prevent="auth" class="mt-4">
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

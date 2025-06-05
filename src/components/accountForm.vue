<script setup lang="ts">

/**
 * @todo Fix the logOut function (currently identical to login function)
 * @todo Add proper JWT-based authentication instead of insecure cookie-based authentication
 * @todo Set secure and httpOnly flags on cookies
 * @todo Remove debug console.log statements from production code
 * @todo Implement form validation with meaningful error messages
 * @todo Add loading indicators for asynchronous operations
 * @todo Add proper error handling and user feedback for failed operations
 * @todo Implement accessibility improvements (ARIA attributes, keyboard navigation)
 */

const props = defineProps(['mode'])
const email = ref('')
const password = ref('')
const user = useCookie<{ name: string } | null>('user', {"maxAge": 86400})
const logins = useCookie<number>('logins')
console.log(user.value)
async function auth() {
  const endpoint = props.mode === "Login" ? "login" : "register"

  try {
    const data = await $fetch(`/api/auth/${endpoint}`, {
      method: 'POST',
      body: {email: email.value, password: password.value}
    })
    if (data.success) {
      login()
    }else{

    }
  } catch (error) {
    console.error(error)
  }
}

const login = () => {
  logins.value = (logins.value || 0) + 1
  user.value = {email: email.value}
}
const logOut = () => {
  logins.value = (logins.value || 0) + 1
  user.value = {email: email.value}
}

const UserName = computed(() => {
  console.log(user.value)
  return  user.value.email;
})

</script>
<template>
  <div v-if="!user?.email" class="h-50">
    <form class="space-y-4" @submit.prevent="auth">
      <div>
        <label for="email" class="block text-sm font-medium text-secondary">E-Mail-Adresse</label>
        <input v-model="email" type="email" id="email" name="email" required
               class="primary-input">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-secondary">Passwort</label>
        <input v-model="password" type="password" id="password" name="password" required
               class=" primary-input">
      </div>
      <button type="submit" class="submit-btn">
        Senden
      </button>
    </form>
  </div>
  <div v-else>
    <p class="text-secondary mb-4">Du bist angemeldet als: {{ UserName }}</p>
    <button @click="user.value = null" class="submit-btn">
      Abmelden
    </button>
  </div>
</template>

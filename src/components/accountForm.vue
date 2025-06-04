<script setup>
const props = defineProps(['mode'])
const email = ref('')
const password = ref('')

async function auth() {
  const endpoint = props.mode==="Login" ? "login" :"register"
  try{
    const data  = await $fetch(`/api/auth/${endpoint}`, {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    console.log(data)

  }catch(error){
    console.error(error)
  }
}

</script>
<template>
  <form class="space-y-4" @submit.prevent="auth">
    <div>
      <label for="email" class="block text-sm font-medium text-secondary">E-Mail-Adresse</label>
      <input v-model="email" type="email" id="email" name="email" required
             class="primary-input">
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-secondary">Passwort</label>
      <input  v-model="password" type="password" id="password" name="password" required
             class=" primary-input">
    </div>
    <button type="submit"
            class="submit-btn">
      Senden
    </button>
  </form>
</template>

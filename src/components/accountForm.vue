<template>
  <form class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-secondary">E-Mail-Adresse</label>
      <input type="email" id="email" name="email" required
             class="primary-input">
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-secondary">Passwort</label>
      <input type="password" id="password" name="password" required
             class=" primary-input">
    </div>
    <button type="submit"
            class="submit-btn">
      Senden
    </button>
  </form>
</template>
<script setup lang="ts">
</script>
<script setup lang="ts">

/**
 * @todo Create a consistent design system with reusable components
 * @todo Implement accessibility improvements (ARIA attributes, keyboard navigation)
 * @todo Add animation for smoother transitions
 * @todo Support different types of notifications (error, warning, success, info)
 * @todo Allow customizable duration for notifications
 * @todo Add ability to manually dismiss notifications
 * @todo Implement stacking for multiple notifications
 * @todo Add internationalization (i18n) support for error messages
 */

const showError = ref(false)
const errorMessage = ref('')

function triggerError(message :string) {
  errorMessage.value = message
  showError.value = true

  setTimeout(() => {
    showError.value = false
  }, 3000)
}
</script>

<template>
  <button @click="triggerError('Etwas ist schiefgelaufen')">Fehler anzeigen</button>

  <div v-if="showError" class="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition">
    {{ errorMessage }}
  </div>
</template>

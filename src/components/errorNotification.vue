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
const timeout = ref(5000) // 5 seconds

function triggerError(message :string) {
  errorMessage.value = message
  showError.value = true
}
</script>

<template>
  <v-snackbar
    v-model="showError"
    :timeout="timeout"
    color="error"
    location="top right"
  >
    {{ errorMessage }}

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="showError = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

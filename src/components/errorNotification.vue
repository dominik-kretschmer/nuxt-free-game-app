<script setup lang="ts">

/**
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

<script setup lang="ts">
import {routes} from "~/config/page-routes";

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
  <section class="min-h-screen flex items-center justify-center font-sans text-base">
    <div class="bg-soft p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-heading text-center text-base mb-6">
        {{ config.headline }}
      </h2>
      <account-form/>
      <p class="mt-4 text-center text-sm text-secondary">
        {{ config.footerText }}
        <nuxt-link :href="config.link" class="text-accent hover:underline">
          {{ config.linkText }}
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

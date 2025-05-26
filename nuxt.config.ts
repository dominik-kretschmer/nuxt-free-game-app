export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image'
    ]
})
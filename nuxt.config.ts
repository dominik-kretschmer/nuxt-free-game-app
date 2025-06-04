export default defineNuxtConfig({
    srcDir: 'src/',
    routeRules:{
        '/': { redirect: '/home' }
    },
    compatibilityDate: '2025-05-15',
    ssr: true,
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image'
    ],
})
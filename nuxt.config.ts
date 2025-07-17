import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    devServer: {
        port: 3000
    },
    build: {
        transpile: ['vuetify'],
    },
    srcDir: 'src/',
    routeRules: {
        '/': {redirect: '/home'}
    },
    compatibilityDate: '2025-05-15',
    ssr: true,
    devtools: {enabled: true},
    nitro: {
        routeRules: {
            '/api/**': { cors: true }
        }
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@pinia/nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins.push(vuetify({autoImport: true}))
            })
        }
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})

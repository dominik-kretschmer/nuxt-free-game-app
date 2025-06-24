import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'light',
            themes: {
                light: {
                    colors: {
                        primary: '#054442',
                        secondary: '#5E6973',
                        accent: '#11e3a9',
                        background: '#1E1E1E',
                        surface: 'rgba(85,85,90,0.64)',
                        warning: '#F6C177',
                        info: '#A3C9F9',
                        success: '#A8E6CF',
                        error: '#FF6B6B',
                    },
                },
            },
        },
    })
    app.vueApp.use(vuetify)
})

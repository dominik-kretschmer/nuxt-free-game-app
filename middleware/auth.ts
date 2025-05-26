export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return
    const nuxtApp = useNuxtApp()
    if ( nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
    console.log("super duper nicer shiii ")
})
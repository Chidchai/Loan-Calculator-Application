export default defineNuxtRouteMiddleware((to, _from) => {
    const session = useSupabaseSession()

    const publicPages = ['/login', '/register']

    const isPublicPage = publicPages.some(p => to.path.startsWith(p))

    if (!session.value && !isPublicPage) {
        return navigateTo('/login')
    }

    if (session.value && publicPages.includes(to.path)) {
        return navigateTo('/')
    }
})

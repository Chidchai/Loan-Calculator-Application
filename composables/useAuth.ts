export const useAuth = () => {

    const supabase = useSupabaseClient()
    const user = ref<any>(null)

    const fetchUser = async () => {
        const { data } = await supabase.auth.getUser()
        user.value = data.user
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Logout error:', error.message)
            return
        }

        await navigateTo('/login')
    }

    onMounted(() => {
        fetchUser()
    })

    return {
        user,
        fetchUser,
        logout,
        isLoggedIn: computed(() => !!user.value),
        supabase
    }
}

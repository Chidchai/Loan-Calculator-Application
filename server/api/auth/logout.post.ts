export default defineEventHandler(async (event) => {
    const supabase = supabaseServerClient(event)
    await supabase.auth.signOut()

    deleteCookie(event, 'sb-vmfvbijqmrymgzusxssw-auth-tokenn')
    return { success: true }
})

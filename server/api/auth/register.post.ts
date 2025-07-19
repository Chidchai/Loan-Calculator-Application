import { supabaseServerClient } from '@/server/utils/supabaseServer'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)


    const supabase = supabaseServerClient(event)

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        throw createError({ statusCode: 400, statusMessage: error.message })
    }

    return { user: data.user }
})

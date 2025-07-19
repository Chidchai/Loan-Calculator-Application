import { supabaseServerClient } from "~/server/utils/supabaseServer"

// server/api/login.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    const supabase = supabaseServerClient(event)

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw createError({ statusCode: 401, message: error.message })

    return { user: data.user }
})

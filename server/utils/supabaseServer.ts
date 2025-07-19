import { createServerClient } from '@supabase/ssr'
import type { H3Event } from 'h3'
import { getCookie, setCookie } from 'h3'

export const supabaseServerClient = (event: H3Event) => {
    const config = useRuntimeConfig()

    return createServerClient(
        config.public.supabaseUrl,
        config.public.supabaseKey,
        {
            cookies: {
                get: (key) => getCookie(event, key),
                set: (key, value, options) => setCookie(event, key, value, options),
                remove: (key, options) => setCookie(event, key, '', { ...options, maxAge: -1 }),
            },
        }
    )
}

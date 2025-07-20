// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8080,
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@nuxt/test-utils', 'shadcn-nuxt', '@vite-pwa/nuxt', '@nuxtjs/supabase', '@nuxtjs/color-mode'],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Loan Calculator',
      short_name: 'LoanCalc',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0f172a',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "",
      include: undefined,
      exclude: ["/register",],
      saveRedirectToCookie: false,
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    }
  }
});


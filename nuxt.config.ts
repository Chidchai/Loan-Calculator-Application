// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 8080,
  },

  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@nuxt/test-utils', 'shadcn-nuxt',],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  ui: {
    colorMode: true,
  },
});

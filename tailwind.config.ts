export default {
    darkMode: 'class', // ใช้ class ไม่ใช่ media
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './nuxt.config.ts'
    ],
    theme: {
        extend: {}
    },
    plugins: [],
}

// stores/theme.ts
export const useThemeStore = defineStore('theme', () => {
    const colorMode = useColorMode()

    const current = computed(() => colorMode.value)

    const toggleTheme = () => {
        const newTheme = colorMode.value === 'dark' ? 'light' : 'dark'
        colorMode.preference = newTheme
        colorMode.value = newTheme
    }

    return {
        current,
        toggleTheme
    }
})

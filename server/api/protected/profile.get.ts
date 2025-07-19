export default defineEventHandler((event) => {
    const user = event.context.user
    return {
        message: `Welcome ${user.email}`
    }
})

export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Middleware to from:',to, from)
    const auth = useState('auth')
    console.log("auth",auth);
    
    if (!auth.value.isAuthenticated) {
      return navigateTo('/user-admin/error')
    }
  
    if (to.path !== '/dashboard') {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    }
  })
  
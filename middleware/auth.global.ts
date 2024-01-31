export default defineNuxtRouteMiddleware((to, from) => {
    console.log('Middleware to from:',to, from)
    const auth = useState('auth')
    console.log("auth",auth);
    
  
      // return navigateTo('/user-admin/error')
      // throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  
  })
  
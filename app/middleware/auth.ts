
export default defineNuxtRouteMiddleware(async (to, from) => {

  const userSession = useCookie<any>('user_session')


  if (!userSession.value) {
    return navigateTo('/login')
  }

  try {
  
    const data = await $fetch('/api/auth/checkEmail', {
      method: 'POST',
      body: { email: userSession.value.email }
    })


    if (!data.existe) {
      userSession.value = null 
      return navigateTo('/')   
    }

  } catch (error) {
    
    userSession.value = null
    return navigateTo('/')
  }
})
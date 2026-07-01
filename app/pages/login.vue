<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const pasoFuncion = ref(1) 
const cargando = ref(false)
const mensajeError = ref('')


const userSession = useCookie('user_session', {
    maxAge: 60 * 15,
    watch: true
})


const procesarPaso1 = async () => {
    if (!email.value) return

    cargando.value = true
    mensajeError.value = ''

    try {
        
        const data = await $fetch('/api/auth/checkEmail', {
            method: 'POST',
            body: { email: email.value }
        })

        if (data.existe) {
           
            pasoFuncion.value = 2
        } else {
            
            await navigateTo(`/mis-eventos?email=${email.value}`)
        }
        cargando.value = false
    } catch (err) {
        mensajeError.value = 'Error al conectar con el servidor.'
        cargando.value = false
    } 
}


const procesarPaso2 = async () => {
    if (!password.value) return

    cargando.value = true
    mensajeError.value = ''

    try {
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        })

        if (data.success) {

            userSession.value = data.user
            await navigateTo('/admin/dashboard')
        }
        cargando.value = false
    } catch (err) {
        mensajeError.value = err.data?.statusMessage || 'Contraseña incorrecta.'
        cargando.value = false
    }

}
</script>

<template>
    <div class=" bg-stone-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div class="flex flex-col space-y-4 text-center md:text-left md:items-start items-center">
                <h2 class="text-3xl font-black text-burdeo tracking-wider">
                    Smart Events
                </h2>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-600 leading-tight">
                    Encuentra los <span class="text-burdeo">eventos</span> que estabas buscando
                </h1>

                <div class="relative w-full max-w-sm h-64 hidden md:block">
                    <div
                        class="absolute top-1 left-0 rounded-2xl overflow-hidden shadow-md transform -rotate-6 w-45 h-40">
                        <img src="/images/concierto.webp" class="w-full h-full object-cover" alt="">
                    </div>
                    <div
                        class="absolute top-8 right-4 rounded-2xl overflow-hidden shadow-lg transform -rotate-6 w-45 h-40 z-10">
                        <img src="/images/concierto.webp" class="w-full h-full object-cover" alt="">
                    </div>
                    <div
                        class="absolute bottom-3 overflow-hidden w-28 h-28 rounded-full left-30 z-15 shadow-md border-2 border-burdeo">
                        <img src="/images/concierto.webp" class="w-full h-full object-cover" alt="">
                    </div>
                </div>
            </div>

            <div class="w-full max-w-md mx-auto">
                <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
                    <h3 class="text-lg font-bold text-stone-600 text-center md:text-left">
                        {{ pasoFuncion === 1 ? 'Acceder a Smart Events' : 'Verificación de Seguridad Staff' }}
                    </h3>

                    <div v-if="mensajeError"
                        class="text-sm bg-red-50 text-red-600 p-3 rounded-xl font-medium border border-red-100">
                        {{ mensajeError }}
                    </div>

                    <Transition name="fade" mode="out-in">

                        <form v-if="pasoFuncion === 1" key="pasoFuncion1" class="space-y-4" @submit.prevent="procesarPaso1">
                            <div>
                                <input v-model="email" type="email" required
                                    placeholder="Introduce tu correo electrónico"
                                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-burdeo focus:ring-1 focus:ring-burdeo text-stone-800 transition-all placeholder-gray-400" />
                            </div>

                            <div>
                                <button type="submit" :disabled="cargando"
                                    class="w-full bg-burdeo text-white py-3 rounded-xl font-bold text-lg hover:bg-opacity-95 transition-all shadow-md disabled:bg-gray-300 cursor-pointer">
                                    {{ cargando ? 'Identificando cuenta...' : 'Continuar' }}
                                </button>
                            </div>
                        </form>

                        <form v-else key="pasoFuncion2" class="space-y-4" @submit.prevent="procesarPaso2">
                            <div
                                class="flex justify-between items-center bg-stone-50 px-4 py-2.5 rounded-xl border border-gray-100 text-sm">
                                <span class="text-stone-600 truncate font-medium">{{ email }}</span>
                                <button type="button" @click="pasoFuncion = 1"
                                    class="text-xs text-burdeo font-bold hover:underline shrink-0 ml-2 cursor-pointer">
                                    Cambiar
                                </button>
                            </div>

                            <div>
                                <input v-model="password" type="password" required
                                    placeholder="Contraseña de Administrador"
                                    class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-burdeo focus:ring-1 focus:ring-burdeo text-stone-800 transition-all placeholder-gray-400" />
                            </div>

                            <div>
                                <button type="submit" :disabled="cargando"
                                    class="w-full bg-burdeo text-white py-3 rounded-xl font-bold text-lg hover:bg-opacity-95 transition-all shadow-md active:scale-[0.99] disabled:bg-gray-300 cursor-pointer">
                                    {{ cargando ? 'Verificando clave...' : 'Ingresar al Panel' }}
                                </button>
                            </div>
                        </form>

                    </Transition>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>




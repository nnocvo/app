<script setup>
const userSession = useCookie('user_session')
const isMenuOpen = ref(false) 

const cerrarSesion = async () => {
    userSession.value = null
    await navigateTo("/login")
}
</script>

<template>
    <nav class="bg-burdeo text-white shadow-md w-full z-50 relative border-b-4 border-burdeo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex  h-16 items-center justify-between">

                <div class="shrink-0 flex items-center">
                    <NuxtLink to="/" class="text-2xl font-bold tracking-wider">
                        Smart Events
                    </NuxtLink>
                </div>
                <div class="flex items-center md:hidden">
                    <button @click="isMenuOpen = !isMenuOpen" type="button"
                        class="text-stone-200 hover:text-white focus:outline-none p-2 rounded-xl hover:bg-gray-800 bg-opacity-20 transition-all cursor-pointer">
                        <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
                    </button>
                </div>

                <div class="hidden md:flex items-center space-x-4 font-bold gap-4">
                    <span class=" sm:text-stone-300">
                        Usuario: <strong class="text-white">{{ userSession?.nombre }} {{ userSession?.apellido}}</strong>
                    </span>
                    <button @click="cerrarSesion"
                        class="text-burdeo px-4 py-1.5 rounded-lg transition-all bg-white hover:bg-gray-100 cursor-pointer">
                        Cerrar Sesión
                    </button>
                    
                </div>

            </div>
        </div>
        <div v-if="isMenuOpen" class="md:hidden border-t">
            <div class="px-4 pt-3 pb-4 space-y-3 font-bold flex flex-col">

                <div class="text-stone-200 text-xs pb-1 tracking-wider uppercase">
                    Sesión activa:
                    <span class="text-white text-sm font-bold block normal-case mt-1">
                        {{ userSession?.nombre }} {{ userSession?.apellido }}
                    </span>
                </div>

                <button @click="cerrarSesion"
                    class="text-center bg-white text-red-800 px-4 py-2.5 rounded-xl transition-all hover:bg-gray-100 text-sm font-bold block w-full cursor-pointer">
                    Cerrar Sesión
                </button>

            </div>
        </div>
    </nav>
</template>
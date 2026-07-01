<script setup>
import { ref, onMounted } from 'vue'

const ruta = useRoute()
const eventoId = ruta.params.id 


const nombre = ref('')
const apellido = ref('')
const email = ref('')
const evento = ref(null) 

const cargando = ref(false)
const mensajeError = ref('')
const mensajeExito = ref('')


onMounted(async () => {
    try {
        const data = await $fetch(`/api/evento/${eventoId}`)
        evento.value = data
    } catch (err) {
        mensajeError.value = 'No se pudo cargar la información del evento.'
    }
})


const registrarse = async () => {
    if (!nombre.value || !apellido.value || !email.value) return

    cargando.value = true
    mensajeError.value = ''
    mensajeExito.value = ''

    try {
        const respuesta = await $fetch('/api/registro/registro', {
            method: 'POST',
            body: {
                eventId: parseInt(eventoId), 
                nombre: nombre.value,
                apellido: apellido.value,
                email: email.value
            }
        })

        if (respuesta.success) {
            mensajeExito.value = '¡Inscripción exitosa! Te has registrado correctamente.'
            
            nombre.value = ''
            apellido.value = ''
            email.value = ''
        }
        cargando.value = false
    } catch (err) {
       
        mensajeError.value = err.data?.message || 'Hubo un error al procesar tu inscripción.'
        cargando.value = false
    } 
}
</script>

<template>
    <div class="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
        <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">

            <div class="text-center space-y-2">
                <h1 class="text-2xl font-black text-stone-700">Formulario de Inscripción</h1>
                <p v-if="evento" class="text-sm text-stone-600 font-medium">
                    Te estás registrando para: <span class="text-burdeo font-bold">{{ evento.titulo }}</span>
                </p>
            </div>

            <div v-if="mensajeError"
                class="text-sm bg-red-50 text-red-800 p-3 rounded-xl font-medium border border-red-300">
                {{ mensajeError }}
            </div>
            <div v-if="mensajeExito"
                class="text-sm bg-green-50 text-green-900 p-3 rounded-xl font-medium border border-green-400 text-center">
                {{ mensajeExito }}
                <div class="mt-3">
                    <NuxtLink to="/"
                        class="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold inline-block hover:bg-green-700">
                        Volver al Inicio
                    </NuxtLink>
                </div>
            </div>

            <form v-if="!mensajeExito" class="space-y-4" @submit.prevent="registrarse">
                <div>
                    <label class="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Nombre</label>
                    <input v-model="nombre" type="text" required placeholder="Tu primer nombre"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-burdeo focus:ring-1 focus:ring-burdeo text-stone-800 transition-all placeholder-gray-400" 
                        />
                </div>

                <div>
                    <label class="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Apellido</label>
                    <input v-model="apellido" type="text" required placeholder="Tus apellidos"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-burdeo focus:ring-1 focus:ring-burdeo text-stone-800 transition-all placeholder-gray-400"
                         />
                </div>

                <div>
                    <label class="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">Correo
                        Electrónico</label>
                    <input v-model="email" type="email" required placeholder="ejemplo@correo.com"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-burdeo focus:ring-1 focus:ring-burdeo text-stone-800 transition-all placeholder-gray-400" 
                        />
                </div>

                <div class="pt-2">
                    <button type="submit" :disabled="cargando"
                        class="w-full bg-burdeo text-white py-3 rounded-xl font-bold text-lg hover:bg-opacity-95 transition-all shadow-md active:scale-[0.99] disabled:bg-gray-300 cursor-pointer">
                        {{ cargando ? 'Procesando registro...' : 'Confirmar Registro' }}
                    </button>
                </div>
            </form>

        </div>
    </div>
</template>
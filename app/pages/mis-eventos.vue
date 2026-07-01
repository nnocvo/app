<template>
    <div class="min-h-[calc(100vh-4rem)] bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto space-y-8">

            <div
                class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 class="text-2xl font-black text-stone-800 ">Mis Eventos Inscritos</h1>
                    <p class="text-sm text-stone-400  font-medium mt-1">
                        Historial de eventos asociados a: <span class="text-burdeo font-bold">{{ emailUsuario }}</span>
                    </p>
                </div>
            </div>

            <div v-if="cargando" class="text-center py-12 text-stone-400  font-medium text-lg animate-pulse">
                Cargando tus entradas de Smart Events...
            </div>

            <div v-else-if="mensajeError"
                class="bg-red-50 text-red-600 p-4 rounded-xl font-medium border border-red-100 text-center">
                {{ mensajeError }}
            </div>

            <div v-else-if="listaInscripciones.length === 0"
                class="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
                <div class="text-4xl">🎟️</div>
                <h2 class="text-xl font-bold text-stone-700 ">Aún no estás registrado en ningún evento</h2>
                <p class="text-stone-400  text-sm max-w-sm mx-auto">
                    Explora nuestra cartelera principal y regístrate en las mejores conferencias y conciertos.
                </p>
                <div class="pt-2">
                    <NuxtLink to="/"
                        class="bg-burdeo text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-opacity-95 transition-all inline-block shadow-sm">
                        Ver Eventos Disponibles
                    </NuxtLink>
                </div>
            </div>

            <div v-else class="grid grid-cols-1 gap-4">
                <div v-for="item in listaInscripciones" :key="item.id"
                    class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-lg">
                    <div class="space-y-1">
                        <span
                            class="inline-block bg-white-50 bg-opacity-10 text-burdeo text-xs  py-1 rounded-md font-bold uppercase tracking-wider">
                            Ticket Confirmado
                        </span>
                        <h3 class="text-xl font-black text-stone-800 pt-1">
                            {{ item.evento.titulo }}
                        </h3>
                        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 font-medium pt-1">
                            <span class="flex items-center gap-1">Fecha: {{ Fecha(item.evento.fecha) }}</span>
                            <span class="flex items-center gap-1">Hora: {{ Horas(item.evento.fecha) }}</span>
                            <span class="flex items-center gap-1">Dirección: {{ item.evento.lugar }}</span>
                        </div>
                    </div>

                    <div
                        class="w-full sm:w-auto flex flex-col items-end gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                        <span class="text-xs text-stone-400 font-medium">Titular de la Entrada</span>
                        <span class="text-sm font-bold text-stone-800">{{ item.nombre }} {{ item.apellido }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    

    import { ref, onMounted } from 'vue'

    const route = useRoute()
    const emailUsuario = route.query.email 

    const listaInscripciones = ref([])
    const cargando = ref(true)
    const mensajeError = ref('')

    onMounted(async () => {
    if (!emailUsuario) {
        mensajeError.value = 'No se proporcionó ningún correo electrónico.'
        cargando.value = false
        return
    }

    try {
       
        const data = await $fetch(`/api/inscrito/mis-eventos?email=${emailUsuario}`)
        if (data.success) {
            listaInscripciones.value = data.inscripciones
        }
        cargando.value = false
    } catch (err) {
        mensajeError.value = 'Hubo un error al cargar tus eventos.'
        cargando.value = false
    } 
    })

    const Fecha = (fechaString) => {
        if (!fechaString) {
            return ''
        }
        const fecha = new Date(fechaString)
        return fecha.toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'long'
        })
    }

    const Horas = (fechaString) => {
        if (!fechaString) {
            return ''
        }
        const fecha = new Date(fechaString)
        return fecha.toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }


</script>

<style lang="scss" scoped>

</style>
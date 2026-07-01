<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-black text-stone-800">Control de Eventos</h1>
            <button @click="mostrarFormulario = !mostrarFormulario"
                class="bg-burdeo text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md cursor-pointer hover:bg-opacity-95 transition-all ">
                {{ mostrarFormulario ? 'Cancelar' : '+ Crear Nuevo Evento' }}
            </button>
        </div>
        <div v-if="mostrarFormulario" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 class="text-lg font-black text-stone-800 border-b border-gray-100 pb-2">Registrar Nuevo Evento
            </h2>

            <form @submit.prevent="guardarEvento" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1 md:col-span-2">
                    <label class="text-xs font-bold text-stone-500 uppercase">Nombre del Evento</label>
                    <input v-model="nuevoEvento.titulo" type="text" required placeholder="Ej: perreolandia"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-500 uppercase">Ubicación / Lugar</label>
                    <input v-model="nuevoEvento.lugar" type="text" required placeholder="Ej: mi casa"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-500 uppercase">
                        Valor Entrada (0 si es gratis)
                    </label>
                    <input v-model="nuevoEvento.valor" type="number" required min="0"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-500 uppercase">Fecha y Hora de Inicio</label>
                    <input v-model="nuevoEvento.fecha" type="datetime-local" required
                        @click="(e) => e.target.showPicker()"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo w-full cursor-pointer bg-white" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-500 uppercase">Imagen Destacada (Opcional)</label>
                    <fileUpload @cambioArchivo="archivoSeleccionado = $event" class="mt-1" />
                </div>

                <div class="md:col-span-2 pt-2 flex justify-end">
                    <button type="submit"
                        class="bg-gray-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md cursor-pointer hover:bg-gray-900 transition-all">
                        Guardar Evento en Cartelera
                    </button>
                </div>
            </form>
        </div>

        <div v-if="cargando"
            class="text-center py-12 text-stone-500 font-medium animate-pulse bg-white rounded-2xl border border-gray-200 shadow-sm">
            Consultando eventos en la base de datos...
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="bg-stone-50 border-b border-gray-200 text-xs font-bold text-stone-500 uppercase tracking-wider">
                            <th class="px-6 py-4">Preview</th>
                            <th class="px-6 py-4">Evento</th>
                            <th class="px-6 py-4">Fecha / Hora</th>
                            <th class="px-6 py-4">Lugar</th>
                            <th class="px-6 py-4 text-center">Inscritos</th>
                            <th class="px-6 py-4">Valor</th>
                            <th class="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 text-sm text-stone-700">
                        <template v-for="evento in listaEventos" :key="evento.id">

                            <tr class="hover:bg-stone-50 transition-colors">
                                <td class="px-6 py-3">
                                    <img :src="evento.imagen" alt="preview"
                                        class="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                                </td>
                                <td class="px-6 py-4 font-bold text-stone-800">{{ evento.titulo }}</td>
                                <td class="px-6 py-4 text-stone-600">
                                    <div class="font-semibold">{{ Fecha(evento.fecha) }}</div>
                                    <div class="text-xs text-stone-400  font-medium">{{
                                        Horas(evento.fecha) }} </div>
                                </td>
                                <td class="px-6 py-4 text-stone-600 font-medium">{{ evento.lugar }}</td>

                                <td class="px-6 py-4 text-center">
                                    <button @click="toggleInscritos(evento.id)"
                                        class="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1 rounded-full text-xs font-black border border-purple-100 transition-all cursor-pointer flex items-center gap-1 mx-auto">
                                        {{ evento._count.inscritos }} inscritos
                                        <Icon
                                            :name="eventoExpandidoId === evento.id ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                                            class="w-3.5 h-3.5" />
                                    </button>
                                </td>

                                <td class="px-6 py-4 font-bold text-stone-800">
                                    {{ evento.valor == 0 ? 'Gratuito' : `$${evento.valor}` }}
                                </td>
                                <td class="px-6 py-4 text-right space-x-3 font-semibold">
                                    <button @click="eliminarEvento(evento.id, evento.titulo)"
                                        class="text-xs text-red-600 hover:underline cursor-pointer">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="eventoExpandidoId === evento.id" class="bg-stone-50/70">
                                <td colspan="7" class="px-8 py-4 border-t border-b border-gray-200">
                                    <div class="space-y-3 animate-fadeIn">
                                        <div
                                            class="text-xs font-black text-stone-400 uppercase tracking-wider flex items-center gap-2">
                                            <span>Listado Oficial de Personas Registradas</span>
                                        </div>

                                        <div v-if="!evento.inscritos || evento._count.inscritos === 0"
                                            class="text-xs text-stone-400 font-medium italic bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                                            Aún no se registran alumnos inscritos para este evento en cartelera.
                                        </div>

                                        <ul v-else
                                            class="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
                                            <li v-for="persona in evento.inscritos" :key="persona.id"
                                                class="px-4 py-3 flex justify-between items-center hover:bg-stone-50 transition-colors">
                                                <div class="flex flex-col">
                                                    <span class="text-sm font-bold text-stone-800 ">{{
                                                        persona.nombre }} {{ persona.apellido }}</span>
                                                    <span class="text-xs text-stone-400  font-medium">{{
                                                        persona.email || 'Sin correo registrado' }}</span>
                                                </div>

                                                <button
                                                    @click="eliminarInscrito(persona.id, persona.nombre, persona.apellido)"
                                                    class="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg border border-red-100 transition-all cursor-pointer">
                                                    Eliminar inscrito
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>

                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
</template>

<script setup>

definePageMeta({
    middleware: 'auth'
})

const listaEventos = ref([])
const cargando = ref(true)

const mostrarFormulario = ref(false)
const archivoSeleccionado = ref(null)
const nuevoEvento = ref({
    titulo: '',
    lugar: '',
    valor: 0,
    fecha: ''
})
const eventoExpandidoId = ref(null)

const cargarEventos = async () => {
    cargando.value = true
    try {
        const data = await $fetch('/api/evento')
        listaEventos.value = data
        cargando.value = false
    } catch (err) {
        console.error('Error al cargar los eventos: ', err)
        cargando.value = false
    }
}
const guardarEvento = async () => {
    if (new Date(nuevoEvento.value.fecha) < new Date()) {
        alert('Error: Ingrese hora y fecha válidas por favor')
        return
    }

    try {
        const fd = new FormData()
        fd.append('titulo', nuevoEvento.value.titulo)
        fd.append('lugar', nuevoEvento.value.lugar)
        fd.append('valor', nuevoEvento.value.valor.toString())
        fd.append('fecha', nuevoEvento.value.fecha)

        if (archivoSeleccionado.value) {
            fd.append('imagen', archivoSeleccionado.value)
        }

        const data = await $fetch('/api/evento/crear', {
            method: 'POST',
            body: fd
        })

        if (data.success) {
            nuevoEvento.value = { titulo: '', lugar: '', valor: 0, fecha: '' }
            archivoSeleccionado.value = null
            mostrarFormulario.value = false
            await cargarEventos()
        }
    } catch (err) {
        console.error('Error al guardar el evento:', err)
    }
}

const Fecha = (fechaString) => {
    if (!fechaString) return ''
    const fecha = new Date(fechaString)
    return fecha.toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'long'
    })
}

const Horas = (fechaString) => {
    if (!fechaString) return ''
    const fecha = new Date(fechaString)
    return fecha.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
}

const eliminarEvento = async (id, titulo) => {
    const seguro = confirm(`Estás seguro de eliminar "${titulo}"?`)
    if (!seguro) return

    try {
        const data = await $fetch(`/api/evento/${id}`, { method: 'DELETE' })
        if (data.success) {
            await cargarEventos()
        }
    } catch (err) {
        console.error('Error al eliminar el evento:', err)
        
    }
}


const toggleInscritos = (id) => {
    eventoExpandidoId.value = eventoExpandidoId.value === id ? null : id
}


const eliminarInscrito = async (inscritoId, nombrePersona, apellidoPersona) => {
    const seguro = confirm(`¿Estás seguro de dar de baja a ${nombrePersona} ${apellidoPersona} de este evento?`)
    if (!seguro) return

    try {
        const data = await $fetch(`/api/inscrito/${inscritoId}`, { method: 'DELETE' })
        if (data.success) {
            await cargarEventos()
        }
    } catch (err) {
        console.error('Error al intentar eliminar la inscripción.',err)
        
    }
}


onMounted(() => {
    cargarEventos()
})
</script>

<style lang="scss" scoped>

</style>
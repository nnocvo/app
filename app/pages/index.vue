<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div class="relative rounded-3xl overflow-hidden shadow-lg mb-12 bg-gray-400">
            <img src="/images/portada-eventos.webp"
                alt="Eventos y celebración"
                class="absolute inset-0 w-full h-full object-cover opacity-50 md:opacity-100" />

            <div class="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/90 to-transparent"></div>

            <div class="relative p-8 md:p-6 lg:p-8 max-w-2xl">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                    Los mejores eventos en <br /> Chile
                </h1>

                <p class="text-stone-300 text-sm md:text-base mb-8 leading-relaxed">
                    Encuentra los mejores <strong>planes para hacer en Chile</strong> esta semana y descubre todas las
                    novedades con Smart Events.
                    <br /><br />
                    No te pierdas ninguna de las <strong>actividades que tendrán lugar este fin de semana en
                        Chile.</strong> Todos los conciertos, exposiciones, eventos profesionales y teatro para
                    disfrutar esta semana en Chile.
                </p>
            </div>
        </div>

        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-stone-800">Eventos Destacados</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md flex flex-col"
                v-for="evento in eventos"
                :key="evento.id"
                >
                <div class="relative h-48 bg-gray-200">
                    <img :src="evento.imagen"
                        :alt="evento.titulo" class="w-full h-full object-cover" 
                    />
                    <div
                        class="absolute top-4 right-4 bg-burdeo text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                        {{ evento.valor === 0 ? 'Gratuito' : '$' + evento.valor.toLocaleString('es-CL') }} 
                    </div>
                </div>
                <div class="p-5 grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-stone-800 mb-2">
                            {{ evento.titulo }}
                        </h3>
                        <div class="flex items-center text-stone-600 text-sm mb-2">
                            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{{Fecha(evento.fecha)}} a las {{ Horas(evento.fecha) }} </span>
                        </div>
                        <div class="flex items-center text-stone-600 text-sm mb-4">
                            <svg class="h-4 w-4 mr-2 text-burdeo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{{ evento.lugar }}</span>
                        </div>
                    </div>
                    <div class="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
                        <span class="text-stone-600">{{ evento._count.inscritos }} inscritos </span>
                        <NuxtLink :to="`/registrate/${evento.id}`" class="text-burdeo font-bold hover:underline">Inscribirse</NuxtLink>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
const { data: eventos } = await useFetch('/api/evento')
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
</script>

<style lang="scss" scoped>

</style>
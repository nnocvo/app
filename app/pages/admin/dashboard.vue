<script setup>
import { ref, onMounted } from 'vue'
import EventosAdmin from '~/components/eventosAdmin.vue'

definePageMeta({
    middleware: 'auth'
})

const pestañaActual = ref('eventos')


</script>

<template>
    <div class="min-h-screen flex bg-gray-100">

        <aside class="w-64 bg-white p-6 space-y-6 shrink-0 hidden md:block border-r-4 border-burdeo shadow-sm">
            <div class="text-xl font-black tracking-wider text-burdeo">Panel Control</div>

            <nav class="space-y-2">
                <button @click="pestañaActual = 'eventos'" :class="[
                    'w-full text-left px-4 py-3 font-bold text-sm rounded-xl transition-all cursor-pointer',
                    pestañaActual === 'eventos'
                        ? 'bg-burdeo text-white shadow-sm': 'text-stone-800 hover:bg-gray-800 hover:text-white rounded-l-none border-l border-burdeo']">
                    Gestionar Eventos
                </button>

                <button @click="pestañaActual = 'staff'" :class="[
                    'w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer',
                    pestañaActual === 'staff'
                        ? 'bg-burdeo text-white shadow-sm': 'rounded-l-none border-l border-burdeo text-stone-800 hover:bg-gray-800 hover:text-white']">
                    Miembros del Staff
                </button>
            </nav>
        </aside>
       <main class="grow p-8 overflow-y-auto">

            <div class="md:hidden bg-white p-1.5 flex gap-2 rounded-2xl shadow-sm mb-6 border border-gray-200">
                <button @click="pestañaActual = 'eventos'"
                    :class="['flex-1 py-3 font-black text-xs rounded-xl text-center cursor-pointer', pestañaActual === 'eventos' ? 'bg-burdeo text-white shadow-md' : 'text-stone-600 hover:bg-stone-50']">
                    Eventos</button>
                <button @click="pestañaActual = 'staff'"
                    :class="['flex-1 py-3 font-black text-xs rounded-xl text-center cursor-pointer', pestañaActual === 'staff' ? 'bg-burdeo text-white shadow-md' : 'text-stone-600 hover:bg-stone-50']">
                    Staff</button>
            </div>
            <EventosAdmin v-if="pestañaActual === 'eventos'" />


            <UsuariosAdmin v-else-if="pestañaActual === 'staff'"/>

        </main>

    </div>
</template>

<style lang="scss" scoped></style>
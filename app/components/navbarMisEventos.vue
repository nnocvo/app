<template>
    <nav class="bg-burdeo text-white shadow-md w-full z-50 relative border-b-4 border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

                <div class="shrink-0 flex items-center">
                    <NuxtLink to="/" class="text-2xl font-bold tracking-wider">
                        Smart Events
                    </NuxtLink>
                </div>

                <div class=" md:flex space-x-8 items-center">
                    <NuxtLink to="/"
                        class="bg-white text-burdeo px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200 shadow-sm border-2 border-gray-800">
                        Volver a la cartelera
                    </NuxtLink>
                </div>



            </div>
        </div>


    </nav>
</template>

<script setup>
import { ref } from 'vue'



const isOpen = ref(false)
</script>
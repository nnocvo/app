<script setup>
import { useRoute } from 'vue-router';

const userSession = useCookie('user_session')
const userRoute = useRoute()
</script>

<template>
    <div class=" min-h-screen flex flex-col bg-gray-50">
        <NavbarAdminDashboard v-if="userSession && userRoute.path == '/admin/dashboard'" />
        <NavbarAdmin v-else-if="userSession"/>
        <NavbarMisEventos v-else-if="userRoute.path =='/mis-eventos'"/>
        <navbar v-else />
        <main class="grow">
            <slot />
        </main> 
        <Footer />
    </div>
</template>


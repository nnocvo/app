<template>
    <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl font-black text-stone-800">Administración del Staff</h1>
            <button @click="mostrarFormStaff = !mostrarFormStaff"
                class="bg-burdeo text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md cursor-pointer hover:bg-opacity-95 transition-all">
                {{ mostrarFormStaff ? 'Cancelar' : '+ Agregar Miembro' }}
            </button>
        </div>

        <div v-if="mostrarFormStaff" class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h2 class="text-lg font-black text-stone-800 border-b border-gray-100 pb-2">📋 Registrar Nuevo
                Administrador</h2>

            <form @submit.prevent="guardarUsuario" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-600 uppercase">Nombre</label>
                    <input v-model="nuevoStaff.nombre" type="text" required placeholder="Ej: Juan"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-600 uppercase">Apellido</label>
                    <input v-model="nuevoStaff.apellido" type="text" required placeholder="Ej: Pérez"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-600 uppercase">Correo Electrónico (Será su ID de
                        acceso)</label>
                    <input v-model="nuevoStaff.email" type="email" required placeholder="juan.perez@staff.cl"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-xs font-bold text-stone-600 uppercase">Contraseña</label>
                    <input v-model="nuevoStaff.password" type="password" required placeholder="••••••••"
                        class="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-burdeo" />
                </div>

                <div class="md:col-span-2 pt-2 flex justify-end">
                    <button type="submit"
                        class="bg-gray-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md cursor-pointer hover:bg-gray-900 transition-all">
                        Guardar Cuenta de Staff
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="bg-stone-50 border-b border-gray-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
                            <th class="px-6 py-4">Usuario (Nombre y Apellido)</th>
                            <th class="px-6 py-4">Correo Electrónico (ID)</th>
                            <th class="px-6 py-4">Rol de Sistema</th>
                            <th class="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 text-sm text-stone-600">
                        <tr v-for="usuario in listaStaff" :key="usuario.email"
                            class="hover:bg-stone-50 transition-colors">
                            <td class="px-6 py-4 font-bold text-stone-800">
                                {{ usuario.nombre }} {{ usuario.apellido }}
                            </td>
                            <td class="px-6 py-4 text-stone-600 font-medium">{{ usuario.email }}</td>
                            <td class="px-6 py-4">
                                <span
                                    class="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-black uppercase border border-blue-100">
                                    {{ usuario.rol }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right font-semibold">
                                <button @click="eliminarUsuario(usuario.email, usuario.nombre, usuario.apellido)"
                                    class="text-xs text-red-700 hover:underline cursor-pointer">
                                    Eliminar Acceso
                                </button>
                            </td>
                        </tr>

                        <tr v-if="listaStaff.length === 0">
                            <td colspan="4" class="text-center py-8 text-stone-400 italic">
                                No hay cuentas de usuario registradas en el sistema.
                            </td>
                        </tr>
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

const listaStaff = ref([])
const mostrarFormStaff = ref(false)
const nuevoStaff = ref({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    rol: 'staff',
})


const cargarUsuario = async () => {
    try {
        const data = await $fetch('/api/usuario')
        listaStaff.value = data
    } catch (err) {
        console.error('Error al cargar usuarios del staff:', err)
    }
}

const guardarUsuario = async () => {
    try {

        const data = await $fetch('/api/usuario/crear', {
            method: 'POST',
            body: nuevoStaff.value
        })

        if (data.success) {

            nuevoStaff.value = { nombre: '', apellido: '', email: '', password: '', rol: 'staff' }
            mostrarFormStaff.value = false
            await cargarUsuario()
        }
    } catch (err) {
        console.error('No se pudo crear la cuenta de usuario.', err)
    }
}
    const eliminarUsuario = async (email, nombre, apellido) => {
        if (listaStaff.value.length === 1) {
            alert('No se puede eliminar al único administrador del sistema.')
            return
        }

        const seguro = confirm(`¿Estás seguro de revocar el acceso a "${nombre} ${apellido}"?\nEl correo ${email} no podrá volver a entrar al panel.`)
        if (!seguro) return

        try {

            const data = await $fetch(`/api/usuario/${email}`, {
                method: 'DELETE'
            })

            if (data.success) {
                await cargarUsuario()
            }
        } catch (err) {
            console.error('Error al intentar eliminar el usuario.', err)

        }
    }

    onMounted(() => {
       cargarUsuario()
    })

</script>

<style lang="scss" scoped>

</style>
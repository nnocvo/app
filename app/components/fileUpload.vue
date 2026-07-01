<script setup>

const subirArchivo = defineEmits(['cambioArchivo'])

const alSeleccionar = (event) => {
    
    const archivos = event.target?.files || event

    if (archivos && archivos.length > 0) {
        
        subirArchivo('cambioArchivo', archivos[0])
    } else {
        subirArchivo('cambioArchivo', null)
    }
}
</script>

<template>
    <div class="w-full">
        <UInput type="file" accept="image/*" icon="i-heroicons-arrow-up-tray"
            placeholder="Buscar imagen en el equipo..." @change="alSeleccionar" class="w-full text-sm" />
    </div>
</template>
import fs from 'node:fs'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  
  const datos = await readMultipartFormData(event)
  
  if (!datos) {
    throw createError({
      statusCode: 400,
      message: 'No se recibieron datos en el formulario.'
    })
  }

    const campos: Record<string, string> = {}
    let archivoImagen: any = null

    for (const parte of datos) {
    if (!parte.name) continue;

    
    const nombreLimpio = parte.name.replace(/['"]/g, '')

    if (!parte.filename) {
       
        campos[nombreLimpio] = parte.data.toString()
    } else if (nombreLimpio === 'imagen') {
      
        archivoImagen = parte
    }
    }

  const { titulo, lugar, valor, fecha } = campos

 
  if (!titulo || !lugar || !fecha || valor === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Todos los campos de texto son requeridos.'
    })
  }


  let rutaImagenFinal = '/images/default-event.jpg'

  if (archivoImagen) {
   
    const extension = path.extname(archivoImagen.filename)
    const nombreUnico = `${Date.now()}-${Math.round(Math.random() * 1E7)}${extension}`
    
    const carpetaDestino = path.join(process.cwd(), 'public', 'images')
    
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true })
    }

    const rutaAbsoluta = path.join(carpetaDestino, nombreUnico)
    
    fs.writeFileSync(rutaAbsoluta, archivoImagen.data)
    

    rutaImagenFinal = `/images/${nombreUnico}`
  }

   
    const nuevoEvento = await prisma.evento.create({
      data: {
        titulo: titulo,
        lugar: lugar,
        valor: parseInt(valor),
        imagen: rutaImagenFinal,
        fecha: new Date(fecha) 
      }
    })

    return {
      success: true,
      evento: nuevoEvento
    }

})
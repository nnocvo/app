export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { eventId, nombre, apellido, email } = body

 
  if (!eventId || !nombre || !apellido || !email) {
    throw createError({
        statusCode: 400,
        message: 'Todos los campos son estrictamente obligatorios.',
    })
  }

  
  const inscripcionExistente = await prisma.inscrito.findFirst({
    where: {
        eventoId: eventId,
        email: email
    }
  })


  if (inscripcionExistente) {
    throw createError({
        statusCode: 409, 
        message: 'Lo sentimos, ya estás registrado en este evento.',
    })
  }

 
  await prisma.inscrito.create({
        data: {
        eventoId:eventId,
        nombre: nombre,
        apellido: apellido,
        email: email
    }
  })

  return { success: true }
})
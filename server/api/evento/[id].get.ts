export default defineEventHandler(async (event) => {

  const idRuta = getRouterParam(event, 'idRuta')

  if (!idRuta) {
    throw createError({
      statusCode: 400,
      message: 'El ID del evento es obligatorio.'
    })
  }


  const eventoEncontrado = await prisma.evento.findUnique({
    where: {
      id: parseInt(idRuta) 
    }
  })


  if (!eventoEncontrado) {
    throw createError({
      statusCode: 404,
      message: 'El evento solicitado no existe.'
    })
  }

  
  return eventoEncontrado
})
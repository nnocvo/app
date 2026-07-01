export default defineEventHandler(async (event) => {

  const idRuta = getRouterParam(event, 'id')

  if (!idRuta) {
    throw createError({
      statusCode: 400,
      message: 'El ID del evento es estrictamente necesario.'
    })
  }

  const idEvento = parseInt(idRuta)
 
    await prisma.inscrito.deleteMany({
      where: {
        eventoId: idEvento
      }
    })

    await prisma.evento.delete({
      where: {
        id: idEvento
      }
    })

    return {
      success: true,
      message: 'Evento y sus inscripciones eliminados correctamente.'
    }

})
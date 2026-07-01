export default defineEventHandler(async (event) => {
  const idRuta = getRouterParam(event, 'id')

  if (!idRuta) {
    throw createError({
      statusCode: 400,
      message: 'El ID de la inscripción es obligatorio.'
    })
  }
    await prisma.inscrito.delete({
      where: {
        id: parseInt(idRuta)
      }
    })

    return {
      success: true,
      message: 'Inscripción eliminada con éxito.'
    }

})
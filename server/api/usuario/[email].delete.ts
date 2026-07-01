export default defineEventHandler(async (event) => {
  const emailRuta = getRouterParam(event, 'email')

  if (!emailRuta) {
    throw createError({
      statusCode: 400,
      message: 'El email del miembro del staff es requerido.'
    })
  }

    await prisma.usuario.delete({
      where: {
        email: emailRuta
      }
    })

    return {
      success: true,
      message: 'Cuenta de acceso eliminada correctamente.'
    }

})
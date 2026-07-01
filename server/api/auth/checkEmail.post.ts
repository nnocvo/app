

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'El correo electrónico es obligatorio.',
    })
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      email: email,
    },

    select: {
      email: true,
      rol: true
    }
  })

  if (usuario) {
    return { existe: true }
  }

  return { existe: false }
})
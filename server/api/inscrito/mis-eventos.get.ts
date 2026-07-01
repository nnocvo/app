export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const email = query.email as string

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'El correo electrónico es estrictamente obligatorio.'
    })
  }

  const inscripciones = await prisma.inscrito.findMany({
    where: {
      email: email
    },
    include: {
      evento: true
    }
  })

  return {
    success: true,
    inscripciones
  }
})
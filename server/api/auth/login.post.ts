
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ 
      statusCode: 400, 
      message: 'El correo y la contraseña son obligatorios.' 
    })
  }

 
    const usuario = await prisma.usuario.findUnique({
      where: { email: email }
    })

    if (!usuario) {
      throw createError({
        statusCode: 401,
        message: 'El usuario no se encuentra registrado en el sistema.',
      })
    }

    const contraseniaCorrecta = await bcrypt.compare(password, usuario.password)

    if (!contraseniaCorrecta) {
      throw createError({
        statusCode: 401,
        message: 'La contraseña ingresada es incorrecta.',
      })
    }

    return {
      success: true,
      user: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    }
})
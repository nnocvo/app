import bcrypt from "bcryptjs"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email,password,nombre ,apellido, rol } = body

  if (!nombre || !email || !password || !apellido) {
    throw createError({
        statusCode: 400,
        message: 'Todos los campos (nombre, email y contraseña) son obligatorios.'
    })
  }

    try {
    const passwordHash = await bcrypt.hash(password,10)
    const nuevoMiembro = await prisma.usuario.create({
      data: {
            email,
            password: passwordHash,
            nombre,
            apellido,
            rol
            
      }
    })

    return {
      success: true,
      usuario: nuevoMiembro
    }
  } catch (error: any) {
    
  
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 400,
        message: 'El correo electrónico ya se encuentra registrado.'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'No se pudo registrar al miembro del staff en la base de datos.'
    })
  }
})
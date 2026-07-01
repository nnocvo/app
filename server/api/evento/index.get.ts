export default defineEventHandler(async (event) => {
    const eventos = await prisma.evento.findMany({
      include: {
        inscritos: true 
      }
    })

    return eventos.map(evento => ({
      ...evento,
      _count: {
        inscritos: evento.inscritos.length
      }
    }))
  
})
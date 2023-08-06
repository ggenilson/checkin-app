import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/check-ins/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const bodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId } = queryParamsSchema.parse(request.params)
  const { latitude, longitude } = bodySchema.parse(request.body)

  const useCase = makeCheckInUseCase()

  await useCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}

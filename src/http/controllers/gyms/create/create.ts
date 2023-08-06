import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/gym/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { name, description, phone, latitude, longitude } = bodySchema.parse(
    request.body,
  )

  const useCase = makeCreateGymUseCase()

  await useCase.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}

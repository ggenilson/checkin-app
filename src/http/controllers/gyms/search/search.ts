import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/gym/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = queryParamsSchema.parse(request.query)

  const useCase = makeSearchGymsUseCase()

  const { gyms } = await useCase.execute({
    query,
    page,
  })

  return reply.status(201).send({
    gyms,
  })
}

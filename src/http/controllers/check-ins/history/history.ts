import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/check-ins/make-fetch-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = queryParamsSchema.parse(request.query)

  const useCase = makeFetchUserCheckInHistoryUseCase()

  const { checkIns } = await useCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(201).send({
    checkIns,
  })
}

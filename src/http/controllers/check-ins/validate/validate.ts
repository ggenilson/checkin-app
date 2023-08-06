import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/check-ins/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = queryParamsSchema.parse(request.params)

  const useCase = makeValidateCheckInUseCase()

  await useCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}

import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserprofile = makeGetUserProfileUseCase()

  const { user } = await getUserprofile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}

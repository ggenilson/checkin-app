import { PrismaUsersRepository } from '@/repositories/users/prisma-implementation'
import { AuthenticateUseCase } from '../../authenticate/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}

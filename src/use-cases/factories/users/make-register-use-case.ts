import { PrismaUsersRepository } from '@/repositories/users/prisma-implementation'
import { RegisterUseCase } from '../../register/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}

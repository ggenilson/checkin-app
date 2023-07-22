import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma-implementation'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}

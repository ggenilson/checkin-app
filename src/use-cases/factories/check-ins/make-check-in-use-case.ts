import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma-implementation'
import { PrismaGymsRepository } from '@/repositories/gyms/prisma-implementation'
import { CheckInUseCase } from '@/use-cases/check-in/check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}

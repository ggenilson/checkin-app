import { PrismaGymsRepository } from '@/repositories/gyms/prisma-implementation'
import { CreateGymUseCase } from '@/use-cases/create-gym/create-gym'

export function makeCreateGymUseCase() {
  const searchGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(searchGymsRepository)

  return useCase
}

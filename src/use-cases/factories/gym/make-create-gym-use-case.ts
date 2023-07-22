import { PrismaGymsRepository } from '@/repositories/gyms/prisma-implementation'
import { CreateGymUseCase } from '@/use-cases/create-gym/create-gym'

export function makeCreateGymInUseCase() {
  const searchGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(searchGymsRepository)

  return useCase
}

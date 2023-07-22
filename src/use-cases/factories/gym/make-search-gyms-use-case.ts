import { PrismaGymsRepository } from '@/repositories/gyms/prisma-implementation'
import { SearchGymsUseCase } from '@/use-cases/search-gyms/search-gyms'

export function makeSearchGymsInUseCase() {
  const searchGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(searchGymsRepository)

  return useCase
}

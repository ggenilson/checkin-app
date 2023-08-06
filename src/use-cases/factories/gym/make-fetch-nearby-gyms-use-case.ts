import { PrismaGymsRepository } from '@/repositories/gyms/prisma-implementation'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms/fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const searchGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(searchGymsRepository)

  return useCase
}

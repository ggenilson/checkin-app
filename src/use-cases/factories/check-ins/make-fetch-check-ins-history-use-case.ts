import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma-implementation'
import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/fetch-user-check-ins-history/fetch-user-check-ins-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}

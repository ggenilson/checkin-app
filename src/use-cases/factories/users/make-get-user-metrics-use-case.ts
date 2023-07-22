import { PrismaCheckInsRepository } from '@/repositories/check-ins/prisma-implementation'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}

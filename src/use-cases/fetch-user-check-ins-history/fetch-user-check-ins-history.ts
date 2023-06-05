import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins/check-ins-repository'

interface FetchMUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchMUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchMUserCheckInsHistoryUseCaseRequest): Promise<FetchMUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}

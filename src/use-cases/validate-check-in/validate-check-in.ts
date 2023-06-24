import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins/check-ins-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ValidateCheckInUserCaseRequest {
  checkInId: string
}

interface ValidateCheckInUserCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUserCaseRequest): Promise<ValidateCheckInUserCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_At = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}

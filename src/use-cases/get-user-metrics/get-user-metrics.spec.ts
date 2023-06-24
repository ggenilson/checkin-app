import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

const checkInToTest1 = {
  gym_id: 'gym-01',
  user_id: 'user-01',
}

const checkInToTest2 = {
  gym_id: 'gym-02',
  user_id: 'user-01',
}

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create(checkInToTest1)
    await checkInsRepository.create(checkInToTest2)

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})

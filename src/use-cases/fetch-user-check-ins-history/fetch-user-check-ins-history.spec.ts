import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

const checkInToTest1 = {
  gym_id: 'gym-01',
  user_id: 'user-01',
}

const checkInToTest2 = {
  gym_id: 'gym-02',
  user_id: 'user-01',
}

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch user check in history', async () => {
    await checkInsRepository.create(checkInToTest1)
    await checkInsRepository.create(checkInToTest2)

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated user check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        ...checkInToTest1,
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    console.log(checkIns)

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})

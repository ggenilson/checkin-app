import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'

const checkInToTest = {
  gymId: 'gym-01',
  userId: 'user-01',
}

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute(checkInToTest)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

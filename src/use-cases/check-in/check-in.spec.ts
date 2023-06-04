import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
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

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute(checkInToTest)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute(checkInToTest)

    await expect(() => sut.execute(checkInToTest)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute(checkInToTest)

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute(checkInToTest)

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

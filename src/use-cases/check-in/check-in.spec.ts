import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

const checkInToTest = {
  gymId: 'gym-01',
  userId: 'user-01',
  userLatitude: 41.1696129,
  userLongitude: -8.6050843,
}

const gymToTest = {
  id: 'gym-01',
  name: 'Javascript Gym',
  description: '',
  phone: '',
  latitude: new Decimal(0),
  longitude: new Decimal(0),
}

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create(gymToTest)

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

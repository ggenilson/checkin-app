import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-in-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms-repository'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-erros'

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
  latitude: 41.1696129,
  longitude: -8.6050843,
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

    await expect(() => sut.execute(checkInToTest)).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError,
    )
  })

  it('should not be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute(checkInToTest)

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute(checkInToTest)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      ...gymToTest,
      id: 'gym-02',
      latitude: 41.1709051,
      longitude: -8.5932397,
    })

    await expect(() =>
      sut.execute({
        ...checkInToTest,
        gymId: 'gym-02',
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})

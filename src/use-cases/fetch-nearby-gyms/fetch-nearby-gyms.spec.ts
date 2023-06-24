import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

const gymToTest1 = {
  name: 'Near Gym',
  description: null,
  phone: null,
  latitude: 41.1696129,
  longitude: -8.6050843,
}

const gymToTest2 = {
  ...gymToTest1,
  name: 'Far Gym',
  latitude: 41.8696129,
  longitude: -8.5050843,
}

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create(gymToTest1)
    await gymsRepository.create(gymToTest2)

    const { gyms } = await sut.execute({
      userLatitude: 41.1696129,
      userLongitude: -8.6050843,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})

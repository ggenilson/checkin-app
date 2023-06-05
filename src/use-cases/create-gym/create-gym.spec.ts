import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

const gymToTest = {
  name: 'Javascript Gym',
  description: null,
  phone: null,
  latitude: 41.1696129,
  longitude: -8.6050843,
}

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute(gymToTest)

    expect(gym.id).toEqual(expect.any(String))
  })
})

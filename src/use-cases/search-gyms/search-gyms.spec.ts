import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

const gymToTest1 = {
  name: 'Javascript Gym',
  description: null,
  phone: null,
  latitude: 41.1696129,
  longitude: -8.6050843,
}

const gymToTest2 = {
  ...gymToTest1,
  name: 'Typescript Gym',
}

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create(gymToTest1)
    await gymsRepository.create(gymToTest2)

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    console.log(gyms)

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        ...gymToTest1,
        name: `Javascript Gym ${i}`,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)

    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript Gym 21' }),
      expect.objectContaining({ name: 'Javascript Gym 22' }),
    ])
  })
})

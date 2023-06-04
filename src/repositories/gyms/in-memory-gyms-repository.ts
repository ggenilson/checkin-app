import { Gym } from '@prisma/client'
import { GymsRepository } from './gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    if (!gym) return null

    return gym
  }

  async create(data: Gym) {
    const gym = {
      id: data.id,
      name: data.name,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}

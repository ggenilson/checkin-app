import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from './check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_At: data.validated_At ? new Date() : null,
      created_At: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}

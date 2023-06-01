import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory-user-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

const userToTest = {
  name: 'John Doe',
  email: 'johndoe@getMaxListeners.com',
  password: '123',
}

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute(userToTest)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute(userToTest)

    const isPasswordCorrectlyHashed = await compare(
      userToTest.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not register user with same email twice', async () => {
    await sut.execute(userToTest)

    await expect(() => sut.execute(userToTest)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})

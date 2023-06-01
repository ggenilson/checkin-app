import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

const userToTest = {
  name: 'John Doe',
  email: 'johndoe@getMaxListeners.com',
  password_hash: '123',
}

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      ...userToTest,
      password_hash: await hash(userToTest.password_hash, 6),
    })

    const { user } = await sut.execute({
      email: userToTest.email,
      password: userToTest.password_hash,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await expect(() =>
      sut.execute({
        email: userToTest.email,
        password: userToTest.password_hash,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      ...userToTest,
      password_hash: await hash(userToTest.password_hash, 6),
    })

    await expect(() =>
      sut.execute({
        email: userToTest.email,
        password: '1235',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

const userToTest = {
  name: 'John Doe',
  email: 'johndoe@getMaxListeners.com',
  password: '123',
}
describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute(userToTest)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute(userToTest)

    const isPasswordCorrectlyHashed = await compare(
      userToTest.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not register user with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    await registerUseCase.execute(userToTest)

    expect(() => registerUseCase.execute(userToTest)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})

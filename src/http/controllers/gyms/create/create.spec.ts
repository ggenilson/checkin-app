import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Gym',
        description: 'Some description',
        phone: '934876564',
        latitude: 41.1696129,
        longitude: -8.6050843,
      })

    expect(response.statusCode).toEqual(201)
  })
})

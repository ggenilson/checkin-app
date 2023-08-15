import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Javascript Gym',
        description: 'Some description',
        phone: '934876564',
        latitude: 41.1696129,
        longitude: -8.6050843,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Typescript Gym',
        description: 'Some description',
        phone: '934876564',
        latitude: 41.8696129,
        longitude: -8.5050843,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 41.1696129,
        longitude: -8.6050843,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Javascript Gym',
      }),
    ])
  })
})

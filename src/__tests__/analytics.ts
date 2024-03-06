import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'

/* eslint-disable no-undef */
const analyticsRoute = '/api/v1/analytic'
describe('Analytics', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('Testing Analytics Get API', () => {
    it('Should retune unauthorized Access', async () => {
      const { body } = await supertest(TestingApp())
        .get(analyticsRoute)
        .expect(401)
      expect(body.success).toEqual(false)
    })
  })
})

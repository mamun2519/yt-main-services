import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'

/* eslint-disable no-undef */
const AssetRoute = '/api/v1/assets'
describe('Assets', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('Testing Code Implement Get All Assets By User', () => {
    it('Should retune all assets Data', async () => {
      const { body } = await supertest(TestingApp())
        .get(`${AssetRoute}/all-user`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
  describe('Testing Code Implement Specific Assets Data By User', () => {
    it('Should Retune of a  Specific data entry', async () => {
      const id = '65e2efdd0b1bc4fe17413064'
      const { body } = await supertest(TestingApp())
        .get(`${AssetRoute}/details-user/${id}`)
        .expect(404)
      expect(body.success).toEqual(false)
    })
  })
  //
  describe('Testing Code Implement Specific Assets Data By Admin', () => {
    it('Should Retune of a  Specific data entry', async () => {
      const id = '65e2efdd0b1bc4fe17413064'
      const { body } = await supertest(TestingApp())
        .get(`${AssetRoute}/details-admin/${id}`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
})

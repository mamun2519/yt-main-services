/* eslint-disable no-undef */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'

const KeywordRoute = '/api/v1/keyword'
describe('Keyword', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
  describe('Testing Code Implement Get ALL Keywords API', () => {
    it('Should retune all key word data', async () => {
      const { body } = await supertest(TestingApp())
        .get(`${KeywordRoute}/getKeywords`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
  describe('Testing Code Implement Specific Data Get API', () => {
    it('Should retune of a specific Data entry', async () => {
      const id = '65d5cd26ee567e31188ed49e'
      const { body } = await supertest(TestingApp())
        .get(`${KeywordRoute}/getOneKeyword/${id}`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
  describe('Testing Code Implement All trending Data Get API', () => {
    it('Should retune all trending list data query', async () => {
      const { body } = await supertest(TestingApp())
        .get(`${KeywordRoute}/getTrendingKeywords`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
})

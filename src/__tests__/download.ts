/* eslint-disable no-undef */

import mongoose from 'mongoose'
import supertest from 'supertest'
import { TestingApp } from '../utils/test'
import { MongoMemoryServer } from 'mongodb-memory-server'
const DownloadRoute = '/api/v1/download'
describe('Donation', () => {
  beforeAll(async () => {
    const mongoDbMemoryServer = await MongoMemoryServer.create()
    const uri = mongoDbMemoryServer.getUri()
    await mongoose.connect(uri)
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })

  describe('Testing Get All Download data', () => {
    it('should return all feedback data', async () => {
      const { body } = await supertest(TestingApp())
        .get(DownloadRoute)
        .expect(200)
      expect(Array.isArray(body.data.data)).toBe(true)
    })
  })

  describe('Testing Download List Details API', () => {
    it('Should retune of a specific data entry', async () => {
      const id = '65d5ff5fed108a3832863689'
      const { body } = await supertest(TestingApp())
        .get(`${DownloadRoute}/${id}`)
        .expect(200)
      expect(body.success).toEqual(true)
    })
  })
  describe('Testing Download List Details API', () => {
    it('Should delete of a specific data entry', async () => {
      const id = '65d714239d865ee7dfd732ea'
      const { body } = await supertest(TestingApp())
        .delete(`${DownloadRoute}/${id}`)
        .expect(200)
    })
  })
})

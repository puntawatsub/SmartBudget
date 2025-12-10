const request = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/userModel')
const Setting = require('../models/settingModel')
const Analytics = require('../models/analyticsModel')
require('dotenv').config()

describe('User Routes', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }
  })

  afterEach(async () => {
    await User.deleteMany({})
    await Setting.deleteMany({})
    await Analytics.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  // SIGNUP TESTS

  describe('POST /api/signups', () => {
    it('should signup a new user with valid credentials', async () => {
      const res = await request(app).post('/api/signups').send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '123456',
      })

      expect(res.statusCode).toBe(201)
      expect(res.body.message).toBe('User registered successfully')

      const user = await User.findOne({ email: 'test@example.com' })
      expect(user).toBeTruthy()
      expect(user.username).toBe('testuser')
    })

    it('should return error if passwords do not match', async () => {
      const res = await request(app).post('/api/signups').send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '654321',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body.message).toBe('Passwords do not match')
    })

    it('should return error if email already exists', async () => {
      const hashedPassword = await bcrypt.hash('123456', 10)
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
      })

      const res = await request(app).post('/api/signups').send({
        username: 'testuser2',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '123456',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body.message).toBe('Email already exists')
    })
  })

  // LOGIN TESTS

  describe('POST /api/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('123456', 10)
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
      })
    })

    it('should login user with valid credentials', async () => {
      const res = await request(app).post('/api/login').send({
        email: 'test@example.com',
        password: '123456',
      })

      expect(res.statusCode).toBe(200)
      expect(res.body.message).toBe('Login successful')
      expect(res.body.user.email).toBe('test@example.com')
      expect(res.body.user.username).toBe('testuser')
      expect(res.body).toHaveProperty('token')
    })

    it('should return error with wrong password', async () => {
      const res = await request(app).post('/api/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body.message).toBe('Invalid email or password')
    })

    it('should return error with non-existing email', async () => {
      const res = await request(app).post('/api/login').send({
        email: 'nonexist@example.com',
        password: '123456',
      })

      expect(res.statusCode).toBe(400)
      expect(res.body.message).toBe('Invalid email or password')
    })
  })
})

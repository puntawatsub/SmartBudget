const request = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/userModel')
const Goal = require('../models/goal.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

describe('Goal Routes', () => {
  let authToken
  let testUser

  beforeEach(async () => {
    // Create a test user and get auth token before each test
    const hashedPassword = await bcrypt.hash('123456', 10)
    testUser = await User.create({
      username: 'goaluser',
      email: 'goaluser@example.com',
      password: hashedPassword,
    })

    // Generate auth token for the user
    authToken = jwt.sign(
      { id: testUser._id, email: testUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  })

  afterEach(async () => {
    // Clear database after each test
    await User.deleteMany({})
    await Goal.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  // CREATE GOAL TESTS

  describe('POST /api/goals', () => {
    it('should create a new goal with valid data', async () => {
      const goalData = {
        title: 'Buy a car',
        target: 10000,
        saved: 2000,
        deadline: '2025-12-31',
        monthlyTarget: 500,
      }

      const res = await request(app)
        .post('/api/goals')
        .set('Authorization', `Bearer ${authToken}`)
        .send(goalData)

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body.title).toBe('Buy a car')
      expect(res.body.target).toBe(10000)
      expect(res.body.saved).toBe(2000)
      expect(res.body.monthlyTarget).toBe(500)
      expect(res.body.userId.toString()).toBe(testUser._id.toString())
      expect(res.body.progress).toBe(20) // 2000/10000 = 20%

      // Verify goal was saved in database
      const goal = await Goal.findById(res.body._id)
      expect(goal).toBeTruthy()
      expect(goal.title).toBe('Buy a car')
    })

    it('should return 401 if no auth token is provided', async () => {
      const goalData = {
        title: 'Buy a car',
        target: 10000,
        saved: 2000,
        deadline: '2025-12-31',
        monthlyTarget: 500,
      }

      const res = await request(app).post('/api/goals').send(goalData)

      expect(res.statusCode).toBe(401)
    })
  })
  // GET ALL GOALS TESTS

  describe('GET /api/goals', () => {
    it('should get all goals for authenticated user', async () => {
      // Create multiple goals for the user
      await Goal.create([
        {
          title: 'Buy a car',
          target: 10000,
          saved: 2000,
          deadline: '2025-12-31',
          monthlyTarget: 500,
          userId: testUser._id,
        },
        {
          title: 'Vacation',
          target: 5000,
          saved: 1000,
          deadline: '2025-08-15',
          monthlyTarget: 300,
          userId: testUser._id,
        },
      ])

      const res = await request(app)
        .get('/api/goals')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body.length).toBe(2)
      expect(res.body[0].title).toBe('Buy a car')
      expect(res.body[1].title).toBe('Vacation')
    })

    it('should return only goals belonging to the authenticated user', async () => {
      // Create another user with their own goal
      const hashedPassword = await bcrypt.hash('123456', 10)
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: hashedPassword,
      })

      await Goal.create({
        title: 'Other user goal',
        target: 3000,
        saved: 500,
        deadline: '2025-12-31',
        monthlyTarget: 200,
        userId: otherUser._id,
      })

      await Goal.create({
        title: 'My goal',
        target: 5000,
        saved: 1000,
        deadline: '2025-12-31',
        monthlyTarget: 300,
        userId: testUser._id,
      })

      const res = await request(app)
        .get('/api/goals')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0].title).toBe('My goal')
      expect(res.body[0].userId.toString()).toBe(testUser._id.toString())
    })

    it('should return empty array if user has no goals', async () => {
      const res = await request(app)
        .get('/api/goals')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body.length).toBe(0)
    })
  })

  // UPDATE GOAL TESTS

  describe('PUT /api/goals/:id', () => {
    it('should update an existing goal', async () => {
      const goal = await Goal.create({
        title: 'Buy a car',
        target: 10000,
        saved: 2000,
        deadline: '2025-12-31',
        monthlyTarget: 500,
        userId: testUser._id,
      })

      const updateData = {
        title: 'Buy a new car',
        target: 15000,
        saved: 3000,
        monthlyTarget: 600,
      }

      const res = await request(app)
        .put(`/api/goals/${goal._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)

      expect(res.statusCode).toBe(200)
      expect(res.body.title).toBe('Buy a new car')
      expect(res.body.target).toBe(15000)
      expect(res.body.saved).toBe(3000)
      expect(res.body.monthlyTarget).toBe(600)
      expect(res.body.progress).toBe(20) // 3000/15000 = 20%

      // Verify update in database
      const updatedGoal = await Goal.findById(goal._id)
      expect(updatedGoal.title).toBe('Buy a new car')
      expect(updatedGoal.target).toBe(15000)
    })

    it('should not update goal belonging to another user', async () => {
      // Create another user with their own goal
      const hashedPassword = await bcrypt.hash('123456', 10)
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: hashedPassword,
      })

      const otherGoal = await Goal.create({
        title: 'Other user goal',
        target: 3000,
        saved: 500,
        deadline: '2025-12-31',
        monthlyTarget: 200,
        userId: otherUser._id,
      })

      const updateData = {
        title: 'Hacked goal',
        target: 999,
      }

      const res = await request(app)
        .put(`/api/goals/${otherGoal._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)

      expect(res.statusCode).toBe(200)
      expect(res.body).toBeNull()

      // Verify goal was not updated
      const unchangedGoal = await Goal.findById(otherGoal._id)
      expect(unchangedGoal.title).toBe('Other user goal')
    })

    it('should recalculate progress when updating saved amount', async () => {
      const goal = await Goal.create({
        title: 'Vacation',
        target: 5000,
        saved: 1000,
        deadline: '2025-08-15',
        monthlyTarget: 300,
        userId: testUser._id,
      })

      const res = await request(app)
        .put(`/api/goals/${goal._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ saved: 2500 })

      expect(res.statusCode).toBe(200)
      expect(res.body.saved).toBe(2500)
      expect(res.body.progress).toBe(50) // 2500/5000 = 50%
    })
  })
  // DELETE GOAL TESTS

  describe('DELETE /api/goals/:id', () => {
    it('should delete an existing goal', async () => {
      const goal = await Goal.create({
        title: 'Buy a car',
        target: 10000,
        saved: 2000,
        deadline: '2025-12-31',
        monthlyTarget: 500,
        userId: testUser._id,
      })

      const res = await request(app)
        .delete(`/api/goals/${goal._id}`)
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.statusCode).toBe(200)
      expect(res.body.message).toBe('Goal deleted')

      // Verify goal was deleted from database
      const deletedGoal = await Goal.findById(goal._id)
      expect(deletedGoal).toBeNull()
    })

    it('should not delete goal belonging to another user', async () => {
      // Create another user with their own goal
      const hashedPassword = await bcrypt.hash('123456', 10)
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: hashedPassword,
      })

      const otherGoal = await Goal.create({
        title: 'Other user goal',
        target: 3000,
        saved: 500,
        deadline: '2025-12-31',
        monthlyTarget: 200,
        userId: otherUser._id,
      })

      const res = await request(app)
        .delete(`/api/goals/${otherGoal._id}`)
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.statusCode).toBe(200)

      // Verify goal still exists
      const stillExists = await Goal.findById(otherGoal._id)
      expect(stillExists).toBeTruthy()
      expect(stillExists.title).toBe('Other user goal')
    })
  })
})

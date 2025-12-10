const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../app');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
require('dotenv').config();

describe('Categories API', () => {
  beforeAll(async () => {
    // if (mongoose.connection.readyState === 0) {
    //   await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
    // }
  });

  afterEach(async () => {
    await Category.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // helper to create a user and return auth header
  const createAuthHeader = async () => {
    const hashed = await bcrypt.hash('password123', 10);
    const user = await User.create({ username: 'catuser', email: 'cat@example.com', password: hashed });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { header: `Bearer ${token}`, user };
  };

  it('should create a category', async () => {
    const { header, user } = await createAuthHeader();

    const payload = { name: 'Groceries', limit: 500, amountSpent: 0, mm_yyyy: '12_2025' };

    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', header)
      .send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(payload.name);
    expect(res.body.limit).toBe(payload.limit);
    expect(res.body.amountSpent).toBe(payload.amountSpent);
    expect(res.body.userId).toBe(user._id.toString());
  });

  it('should get categories for the user', async () => {
    const { header, user } = await createAuthHeader();

    const cat = await Category.create({ name: 'Transport', limit: 200, amountSpent: 10, mm_yyyy: '12_2025', userId: user._id });

    const res = await request(app).get('/api/categories').set('Authorization', header);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Transport');
  });

  it('should return only categories owned by the authenticated user', async () => {
    // create first user and category
    const { header: h1, user: user1 } = await createAuthHeader();
    await Category.create({ name: 'User1Cat', limit: 100, amountSpent: 0, mm_yyyy: '12_2025', userId: user1._id });

    // create a second user and category
    const hashed = await bcrypt.hash('otherpass', 10);
    const otherUser = await User.create({ username: 'other', email: 'other@example.com', password: hashed });
    await Category.create({ name: 'OtherCat', limit: 50, amountSpent: 5, mm_yyyy: '12_2025', userId: otherUser._id });

    // request as first user
    const res = await request(app).get('/api/categories').set('Authorization', h1);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // should include only User1Cat and not OtherCat
    const names = res.body.map((c) => c.name);
    expect(names).toEqual(expect.arrayContaining(['User1Cat']));
    expect(names).not.toContain('OtherCat');
  });

  it('should require authentication to get categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  // Get unique categories
  it('should return unique category names', async () => {
    const { header, user } = await createAuthHeader();

    await Category.create({ name: 'Food', limit: 100, amountSpent: 0, mm_yyyy: '12_2025', userId: user._id });
    await Category.create({ name: 'Food', limit: 150, amountSpent: 20, mm_yyyy: '11_2025', userId: user._id });
    await Category.create({ name: 'Rent', limit: 800, amountSpent: 0, mm_yyyy: '12_2025', userId: user._id });

    const res = await request(app).get('/api/categories/unique').set('Authorization', header);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // names should include Food and Rent
    expect(res.body).toEqual(expect.arrayContaining(['Food', 'Rent']));
  });

  
});

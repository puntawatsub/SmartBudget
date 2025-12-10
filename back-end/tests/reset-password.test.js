const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Mock nodemailer BEFORE requiring app
jest.mock("nodemailer");
const nodemailer = require("nodemailer");

// Set up the mock before requiring app
const mockSendMail = jest.fn().mockResolvedValue({ messageId: "test@test.com" });
nodemailer.createTransport.mockReturnValue({
  sendMail: mockSendMail,
});

const app = require("../app");
const User = require("../models/userModel");
const Setting = require("../models/settingModel");
const Analytics = require("../models/analyticsModel");

describe("Password Reset Routes", () => {
  afterEach(async () => {
    await User.deleteMany({});
    await Setting.deleteMany({});
    await Analytics.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // FORGOT PASSWORD TESTS

  describe("POST /api/forgot-password", () => {
    it("should send reset link if email exists", async () => {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
      });

      const res = await request(app).post("/api/forgot-password").send({
        email: "test@example.com",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Reset link sent to your email");

      // Verify that resetToken and resetTokenExpiry are set
      const user = await User.findOne({ email: "test@example.com" });
      expect(user.resetToken).toBeTruthy();
      expect(user.resetTokenExpiry).toBeTruthy();
    });

    it("should return success message for non-existing email (security)", async () => {
      const res = await request(app).post("/api/forgot-password").send({
        email: "nonexistent@example.com",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("If this email exists, reset link sent");
    });

    it("should generate valid JWT token in resetToken", async () => {
      const hashedPassword = await bcrypt.hash("123456", 10);
      const user = await User.create({
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
      });

      await request(app).post("/api/forgot-password").send({
        email: "test@example.com",
      });

      const updatedUser = await User.findOne({ email: "test@example.com" });
      expect(updatedUser.resetToken).toBeTruthy();

      // Verify the token is valid JWT
      const decoded = jwt.verify(updatedUser.resetToken, process.env.JWT_SECRET);
      expect(decoded.id).toBe(user._id.toString());
    });

    it("should set resetTokenExpiry to 15 minutes from now", async () => {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
      });

      const beforeRequest = Date.now();
      await request(app).post("/api/forgot-password").send({
        email: "test@example.com",
      });
      const afterRequest = Date.now();

      const user = await User.findOne({ email: "test@example.com" });
      const fifteenMinutesInMs = 15 * 60 * 1000;
      const expiryTime = user.resetTokenExpiry.getTime ? user.resetTokenExpiry.getTime() : user.resetTokenExpiry;

      expect(expiryTime).toBeGreaterThanOrEqual(beforeRequest + fifteenMinutesInMs);
      expect(expiryTime).toBeLessThanOrEqual(afterRequest + fifteenMinutesInMs);
    });
  });

  // RESET PASSWORD TESTS

  describe("POST /api/reset-password/:token", () => {
    let testUser;
    let resetToken;

    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash("123456", 10);
      testUser = await User.create({
        username: "testuser",
        email: "test@example.com",
        password: hashedPassword,
      });

      resetToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      testUser.resetToken = resetToken;
      testUser.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
      await testUser.save();
    });

    it("should reset password with valid token", async () => {
      const res = await request(app)
        .post(`/api/forgot-password/reset-password/${resetToken}`)
        .send({
          password: "newpassword123",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Password reset successfully");

      // Verify password is changed
      const updatedUser = await User.findById(testUser._id);
      const isPasswordMatch = await bcrypt.compare("newpassword123", updatedUser.password);
      expect(isPasswordMatch).toBe(true);
    });

    it("should clear resetToken after successful reset", async () => {
      await request(app)
        .post(`/api/forgot-password/reset-password/${resetToken}`)
        .send({
          password: "newpassword123",
        });

      const updatedUser = await User.findById(testUser._id);
      expect(updatedUser.resetToken).toBeUndefined();
      expect(updatedUser.resetTokenExpiry).toBeUndefined();
    });

    it("should return error with invalid token", async () => {
      const invalidToken = "invalid.token.here";

      const res = await request(app)
        .post(`/api/forgot-password/reset-password/${invalidToken}`)
        .send({
          password: "newpassword123",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Token expired or invalid");
    });

    it("should return error with expired token", async () => {
      // Create a token that's already expired
      const expiredToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
        expiresIn: "-1h",
      });

      testUser.resetToken = expiredToken;
      testUser.resetTokenExpiry = new Date(Date.now() - 1000); // 1 second ago
      await testUser.save();

      const res = await request(app)
        .post(`/api/forgot-password/reset-password/${expiredToken}`)
        .send({
          password: "newpassword123",
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Token expired or invalid");
    });

    it("should return error with mismatched token", async () => {
      // Create and store the valid reset token
      const storedToken = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      testUser.resetToken = storedToken;
      testUser.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
      await testUser.save();

      // Create a different valid token (by introducing delay and/or using a different payload)
      // Adding a small delay to ensure different token generation
      await new Promise(resolve => setTimeout(resolve, 100));

      const differentToken = jwt.sign({ id: testUser._id, extra: "data" }, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });

      // Try to reset password with the different token
      const res = await request(app)
        .post(`/api/forgot-password/reset-password/${differentToken}`)
        .send({
          password: "newpassword123",
        });

      // Should fail because the token in request doesn't match the stored token
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid or expired token");
    });

    it("should hash the new password before saving", async () => {
      const plainPassword = "newpassword123";

      await request(app)
        .post(`/api/forgot-password/reset-password/${resetToken}`)
        .send({
          password: plainPassword,
        });

      const updatedUser = await User.findById(testUser._id);
      
      // Password should be hashed (not equal to plain text)
      expect(updatedUser.password).not.toBe(plainPassword);
      
      // But should match when compared with bcrypt
      const isPasswordMatch = await bcrypt.compare(plainPassword, updatedUser.password);
      expect(isPasswordMatch).toBe(true);
    });

    it("should allow login after password reset", async () => {
      const newPassword = "newpassword123";

      await request(app)
        .post(`/api/forgot-password/reset-password/${resetToken}`)
        .send({
          password: newPassword,
        });

      // Attempt to login with new password
      const loginRes = await request(app).post("/api/login").send({
        email: "test@example.com",
        password: newPassword,
      });

      expect(loginRes.statusCode).toBe(200);
      expect(loginRes.body.message).toBe("Login successful");
      expect(loginRes.body.user.email).toBe("test@example.com");
    });
  });
});

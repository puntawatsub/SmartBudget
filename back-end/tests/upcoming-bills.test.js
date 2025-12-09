const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const UpcomingBill = require("../models/upcomingBillsModel");
const dotenv = require("dotenv");

dotenv.config();

let token;

beforeAll(async () => {
  await User.deleteMany({});
  await UpcomingBill.deleteMany({});

  const user = {
    username: "testuser",
    email: "test@test.com",
    password: "password123",
    confirmPassword: "password123",
  };

  await api.post("/api/signups").send(user).expect(201);
  const res = await api
    .post("/api/login")
    .send({
      email: "test@test.com",
      password: "password123",
    })
    .expect(200);

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Upcoming Bills API", () => {
  it("Create Upcoming Bill with valid info", async () => {
    const newBill = {
      name: "Electricity",
      date: new Date(),
      due: 100,
    };
    const response = await api
      .post("/api/upcoming-bills")
      .set("Authorization", `Bearer ${token}`)
      .send(newBill)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.name).toBe(newBill.name);
    expect(response.body.due).toBe(newBill.due);
    expect(new Date(response.body.date)).toEqual(newBill.date);
  });
});

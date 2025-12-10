const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const UpcomingBill = require("../models/upcomingBillsModel");
const dotenv = require("dotenv");

dotenv.config();

let token;

const sampleBill = {
  name: "Internet",
  due: 50,
  date: new Date(),
};

let billId;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

beforeEach(async () => {
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

  const res1 = await api
    .post("/api/upcoming-bills")
    .set("Authorization", `Bearer ${token}`)
    .send(sampleBill)
    .expect(201);

  billId = res1.body._id;
});

describe("Upcoming Bills API, Authenticated", () => {
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

  it("fails when invalid info is provided", async () => {
    const newBill = {
      name: "Electricity",
    };
    const response = await api
      .post("/api/upcoming-bills")
      .set("Authorization", `Bearer ${token}`)
      .send(newBill)
      .expect(400);
  });

  it("Fetch Upcoming Bills for logged-in user", async () => {
    const response = await api
      .get("/api/upcoming-bills")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  it("Update Upcoming Bill", async () => {
    const response = await api
      .put(`/api/upcoming-bills/${billId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        due: 55,
      })
      .expect(200);
    expect(response.body.name).toBe(sampleBill.name);
    expect(new Date(response.body.date)).toEqual(sampleBill.date);
    expect(response.body.due).toBe(55);
  });

  it("returns 404 when Update Upcoming Bill not found", async () => {
    const response = await api
      .put(`/api/upcoming-bills/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        due: 55,
      })
      .expect(404);
  });

  it("Delete upcoming bill by user", async () => {
    await api
      .delete(`/api/upcoming-bills/${billId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const response = await api
      .get("/api/upcoming-bills")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(0);
  });

  it("returns 404 when Delete upcoming bill by user bill not found", async () => {
    await api
      .delete(`/api/upcoming-bills/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });
});

describe("Upcoming Bills API, Unauthenticated", () => {
  it("Fail to create Upcoming Bill without token", async () => {
    const newBill = {
      name: "Electricity",
      date: new Date(),
      due: 100,
    };
    await api.post("/api/upcoming-bills").send(newBill).expect(401);
  });

  it("Fail to fetch Upcoming Bills without token", async () => {
    await api.get("/api/upcoming-bills").expect(401);
  });

  it("Fail to update Upcoming Bill without token", async () => {
    await api
      .put(`/api/upcoming-bills/${billId}`)
      .send({
        due: 55,
      })
      .expect(401);
  });

  it("Fail to delete Upcoming Bill without token", async () => {
    await api.delete(`/api/upcoming-bills/${billId}`).expect(401);
  });
});

describe("Upcoming Bills API, Invalid Token", () => {
  const invalidToken = "Bearer invalid.token.here";

  it("Fail to create Upcoming Bill with invalid token", async () => {
    const newBill = {
      name: "Electricity",
      date: new Date(),
      due: 100,
    };
    await api
      .post("/api/upcoming-bills")
      .set("Authorization", invalidToken)
      .send(newBill)
      .expect(401);
  });

  it("Fail to fetch Upcoming Bills with invalid token", async () => {
    await api
      .get("/api/upcoming-bills")
      .set("Authorization", invalidToken)
      .expect(401);
  });

  it("Fail to update Upcoming Bill with invalid token", async () => {
    await api
      .put(`/api/upcoming-bills/${billId}`)
      .set("Authorization", invalidToken)
      .send({
        due: 55,
      })
      .expect(401);
  });

  it("Fail to delete Upcoming Bill with invalid token", async () => {
    await api
      .delete(`/api/upcoming-bills/${billId}`)
      .set("Authorization", invalidToken)
      .expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

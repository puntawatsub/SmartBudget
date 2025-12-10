const request = require("supertest");
const server = require("../app");

describe("Transactions API tests (protected routes)", () => {
  afterAll((done) => {
    server.close(done);
  });

  test("POST /api/transactions - requires auth", async () => {
    const res = await request(server).post("/api/transactions").send({
      amount: 100,
      type: "income",
      category: "salary",
      description: "Test transaction",
      date: new Date(),
    });

    expect(res.statusCode).toBe(401);
  });

  test("GET /api/transactions - requires auth", async () => {
    const res = await request(server).get("/api/transactions");

    expect(res.statusCode).toBe(401);
  });

  test("GET /api/transactions/:id - requires auth", async () => {
    const res = await request(server).get("/api/transactions/123");

    expect(res.statusCode).toBe(401);
  });

  test("DELETE /api/transactions/:id - requires auth", async () => {
    const res = await request(server).delete("/api/transactions/123");

    expect(res.statusCode).toBe(401);
  });
});

describe("Dashboard API tests (protected route)", () => {
  test("GET /api/dashboard - requires auth", async () => {
    const res = await request(server).get("/api/dashboard");

    expect(res.statusCode).toBe(401);
  });
});

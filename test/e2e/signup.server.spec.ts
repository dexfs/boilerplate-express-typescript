import request from "supertest"
import { app } from "./../../src/server"
import cuid from "cuid"
describe("Signup", () => {
  test("When a valid user registered should be return a token", async () => {
    const payload = {
      name: "Teste",
      email: `${cuid()}@teste.com`,
      password: "123456"
    }
    const response: any = await request(app).post("/auth/signup").send(payload)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      jasmine.objectContaining({
        token: jasmine.any(String)
      })
    )
    expect(typeof response.body.token === "string").toBe(true)
  })
  test("When an invalid user data sent, should return status code 400", async () => {
    const response: any = await request(app).post("/auth/signup").send({})
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(true)
  })
})

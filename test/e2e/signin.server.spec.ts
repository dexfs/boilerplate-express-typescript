import request from "supertest"
import { app } from "./../../src/server"
import cuid from "cuid"
import User from "./../../src/resources/users/model"

describe("Signin", () => {
  describe("Signin with a valid credentials", () => {
    test("When use a valid credentials should be return the token correctly", async () => {
      const payload = {
        email: `${cuid}@teste.com`,
        password: "123456"
      }
      await User.create(payload)
      const response: any = await request(app).post("/auth/signin").send(payload)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(
        jasmine.objectContaining({
          token: jasmine.any(String)
        })
      )
    })
  })
  describe("Signin with an invalid credentials", () => {
    test("When use an invalid credentials should not return the token and return status code 401", async () => {
      const response: any = await request(app).post("/auth/signin").send({})
      expect(response.statusCode).toBe(401)
    })
  })
})

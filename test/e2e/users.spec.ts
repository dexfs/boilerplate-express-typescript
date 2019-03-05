import mongoose from "mongoose"
import request from "supertest"
import { app } from "../../src/server"
import { newToken, verifyToken } from "../../src/helpers/token"
import cuid from "cuid"

let User
let authToken
beforeEach(async (done) => {
  User = mongoose.model("User")
  await User.deleteMany({})
  const credentials = {
    name: `credentials-${cuid()}`,
    email: `credentials.${cuid()}@test.com`,
    password: "123456"
  }
  const user = await User.create(credentials)
  authToken = newToken(user)
  return done()
})

describe("Users resource with logged user", () => {
  describe("Add user", () => {
    test("When use a valid token an user should be added", async () => {
      const userPayload = {
        name: `add-${cuid()}`,
        email: `add.${cuid()}@test.com`,
        password: "123456"
      }
      const user = User.create(userPayload)
      const response: any = await request(app)
        .post("/api/users")
        .send(userPayload)
        .set("Authorization", `Bearer ${authToken}`)

      expect(response.statusCode).toBe(201)
    })
    test("When the token not sent should return status code 401", async () => {
      const response: any = await request(app).post("/api/users").send({})
      expect(response.statusCode).toBe(401)
    })
    test("When use an invalid token should return status code 401", async () => {
      const response: any = await request(app).post("/api/users").send({}).set("Authorization", `Bearer token`)
      expect(response.statusCode).toBe(401)
    })
    test("When use a valid token and invalid user should return status code 401", async () => {
      const token = newToken({
        id: new mongoose.mongo.ObjectId()
      })
      const response: any = await request(app).post("/api/users").send({}).set("Authorization", `Bearer ${token}`)
      expect(response.statusCode).toBe(401)
    })
  })
  describe("Update User", () => {
    test("When I pass a valid user ID should update da values changed", async () => {
      const userPayload = {
        name: `add-${cuid()}`,
        email: `add.${cuid()}@test.com`,
        password: "123456"
      }
      const user = await User.create(userPayload)
      console.log("User", user)
      const newName = `newname.${cuid()}`
      const response: any = await request(app)
        .put(`/api/users/${user._id}`)
        .send({
          name: newName
        })
        .set("Authorization", `Bearer ${authToken}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.data.name).toEqual(newName)
    })
  })
})

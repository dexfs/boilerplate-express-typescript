import { newToken, verifyToken } from "./../../src/helpers/token"
import jwt from "jsonwebtoken"
import cuid from "cuid"

describe("Token", () => {
  test("when an user passed should return a valid token", async () => {
    const user = {
      id: cuid()
    }
    const token = newToken(user)
    const verifyTokenResult: any = await verifyToken(token)
    expect(typeof token === "string").toBe(true)
    expect(typeof verifyTokenResult === "object").toBe(true)
    expect(verifyTokenResult.id).toEqual(user.id)
  })
})

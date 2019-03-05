import * as UserController from "./../../../src/resources/users/controller"
import { isFunction } from "lodash"

describe("UserController", () => {
  const methods = ["me", "create", "update"]
  methods.forEach((name) => {
    test(`the function [${name}] should be exists`, () => {
      methods.forEach((name) => expect(isFunction(UserController[name])).toBe(true))
    })
  })
})

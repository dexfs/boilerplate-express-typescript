import * as AuthController from "./../../../src/resources/auth/controller"
import { isFunction } from "lodash"

describe("AuthController", () => {
  const methods = ["signin", "signup"]
  methods.forEach((name) => {
    test(`the function [${name}] should be exists`, () => {
      methods.forEach((name) => expect(isFunction(AuthController[name])).toBe(true))
    })
  })
})

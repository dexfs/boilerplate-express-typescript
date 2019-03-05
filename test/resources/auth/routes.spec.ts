import authRouter from "./../../../src/resources/auth/routes"

describe("Auth Router", () => {
  const routes = [
    { name: "Signup", path: "/signup", method: "post" },
    { name: "Signin", path: "/signin", method: "post" }
  ]
  routes.forEach((route) => {
    test(`the route [${route.name} - ${route.method} ${route.path} ] should be with correct path and http verb`, () => {
      const match = authRouter.stack.find((s) => s.route.path === route.path && s.route.methods[route.method])
      expect(match).toBeTruthy()
    })
  })
})

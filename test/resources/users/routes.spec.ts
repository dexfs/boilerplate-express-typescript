import userRouter from "./../../../src/resources/users/routes"

describe("User Router", () => {
  const routes = [
    { name: "me", path: "/me", method: "get" },
    { name: "Create user", path: "/", method: "post" },
    { name: "Update user", path: "/:id", method: "put" }
  ]
  routes.forEach((route) => {
    test(`the route [${route.name} - ${route.method} ${route.path} ] should be with correct path and http verb`, () => {
      const match = userRouter.stack.find((s) => s.route.path === route.path && s.route.methods[route.method])
      expect(match).toBeTruthy()
    })
  })
})

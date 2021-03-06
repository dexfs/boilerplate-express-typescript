import { Router } from "express"
import { signup, signin } from "./controller"
import { createValidation } from "./../users/middleware"
const router: Router = Router()

router.post("/signup", createValidation, signup)
router.post("/signin", signin)

export default router

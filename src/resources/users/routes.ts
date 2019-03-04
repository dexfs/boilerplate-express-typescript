import { Router } from "express"
import { me, update, create } from "./controller"
import { createValidation, updateValidation } from "./middleware"

const router = Router()

router.use("/me", me)
router.put("/", updateValidation, update)
router.post("/", createValidation, create)

export default router

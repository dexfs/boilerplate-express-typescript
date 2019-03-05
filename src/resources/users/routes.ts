import { Router } from "express"
import { me, update, create } from "./controller"
import { createValidation, updateValidation } from "./middleware"

const router = Router()

router.get("/me", me)
router.put("/:id", updateValidation, update)
router.post("/", createValidation, create)

export default router

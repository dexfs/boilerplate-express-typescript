import { Request, Response, NextFunction } from "express"
import { fieldsRequired } from "./../../utils/validations/user"
export const createValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fieldsRequired(req.body)
    next()
  } catch (error) {
    return res.status(400).json({
      error: true,
      errors: error.errors
    })
  }
}

export const updateValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fieldsRequired({
      ...req.body,
      ...req.params
    })
    next()
  } catch (error) {
    console.log("VALIDATION", error)
    return res.status(400).json({
      error: true,
      errors: error.errors
    })
  }
}

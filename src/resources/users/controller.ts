import User, { UserModel } from "./model"
import { Request, Response, NextFunction } from "express"

interface UserRequest extends Request {
  user: UserModel
}

export const me = (req: UserRequest, res: Response) => {
  res.status(200).json({ data: req.user })
}

export const update = async (req: UserRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()
    res.status(200).json({ data: user })
  } catch (error) {}
}

export const create = async (req: Request, res: Response) => {
  try {
    const user = User.create(req.body)
    res.status(200).json({ data: user })
  } catch (error) {
    res.status(400).json({
      error: true,
      message: `Ocurr error on Create User`
    })
  }
}

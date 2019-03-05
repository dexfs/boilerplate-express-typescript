import { Request, Response, NextFunction } from "express"
import { verifyToken } from "./../helpers/token"
import User, { UserModel } from "./../resources/users/model"

interface UserRequest extends Request {
  user: UserModel
}

export default async (req: UserRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end()
  }

  const token = bearer.split("Bearer ")[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id).select("-password").lean().exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}

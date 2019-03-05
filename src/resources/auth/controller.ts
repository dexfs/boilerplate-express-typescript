import { Request, Response, NextFunction } from "express"
import { newToken } from "../../helpers/token"
import User from "../users/model"

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({
      token
    })
  } catch (e) {
    console.error(e)
    return res.status(500).end()
  }
}

export const signin = async (req: Request, res: Response) => {
  const invalid = {
    message: "Invalid email and password combination"
  }

  try {
    const user: any = await User.findOne({
      email: req.body.email
    })
      .select("email password")
      .exec()

    if (!user) {
      return res.status(401).send(invalid)
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(200).send({
      token
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

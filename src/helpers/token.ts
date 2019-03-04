import jwt from "jsonwebtoken"
import config from "./../config"

export const newToken = (user) => {
  return jwt.sign(
    {
      id: user.id
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRATION
    }
  )
}

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

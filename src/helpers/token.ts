import jwt from "jsonwebtoken"
import config from "./../config"
import util from "util"

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

export const verifyToken = async (token) => {
  try {
    const jwtVerify = util.promisify(jwt.verify)
    const resultVerifyToken = await jwtVerify(token, config.JWT_SECRET)
    return resultVerifyToken
  } catch (error) {
    console.error("Error in VerifyToken", error)
    return {
      error: true,
      message: "Error when verifying the token"
    }
  }
}

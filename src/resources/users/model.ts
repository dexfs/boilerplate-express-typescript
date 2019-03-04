import mongoose from "mongoose"
import bcrypt from "bcrypt"

export type UserModel = mongoose.Document & {
  name: string,
  email: string,
  password: string,
  checkPassword: checkPasswordFunction
}

type checkPasswordFunction = (candidatePassword: string) => Promise<any>

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

userSchema.pre("save", (next) => {
  if (!this.isModified("password")) {
    return next()
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  })
})

const checkPassword: checkPasswordFunction = function(candidatePassword) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

userSchema.methods.checkPassword = checkPassword

const User = mongoose.model("User", userSchema)
export default User

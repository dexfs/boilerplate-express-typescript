import mongoose from "mongoose"
import bcrypt from "bcrypt"

export interface UserModel extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  checkPassword: checkPasswordFunction
}

type checkPasswordFunction = (candidatePassword: string) => Promise<any>

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      auto: true
    },
    name: String,
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

userSchema.pre("save", function(next) {
  const user: any = this
  if (!this.isModified("password")) {
    return next()
  }
  bcrypt.hash(user.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
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

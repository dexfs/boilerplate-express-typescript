import mongoose from "mongoose"
import MongoMemoryServer from "mongodb-memory-server"
import cuid from "cuid"
import User from "./../src/resources/users/model"
import _ from "lodash"
const models = {
  User
}
// eslint-disable-next-line jest/no-jasmine-globals
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

let mongoServer: any
const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 60000,
  useNewUrlParser: true,
  useFindAndModify: false
}

const connectionInfo = async () => {
  const mongooseOptions = {
    autoIndex: false,
    autoReconnect: false,
    connectTimeoutMS: 60000,
    useNewUrlParser: true,
    useFindAndModify: false
  }

  const db = cuid()
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString(db)
  return {
    mongoUri,
    mongooseOptions
  }
}

const remove = (collection) =>
  new Promise((resolve, reject) => {
    collection.deleteMany((err) => {
      if (err) return reject(err)
      resolve()
    })
  })

const clearDB = () => {
  return Promise.all(_.map(mongoose.connection.collections, (c) => remove(c)))
}

beforeAll(async (done) => {
  if (mongoose.connection.readyState === 0) {
    try {
      const { mongoUri, mongooseOptions } = await connectionInfo()
      await mongoose.connect(mongoUri, mongooseOptions)
      await clearDB()
      await Promise.all(Object.keys(models).map((name) => models[name].init()))
    } catch (error) {
      console.log("connection error")
      console.error(error)
      throw error
    }
  } else {
    await clearDB()
  }

  return done()
})

afterAll(async (done) => {
  await mongoose.connection.db.dropDatabase()
  mongoose.disconnect()
  mongoServer.stop()
  done()
})

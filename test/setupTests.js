import mongoose from "mongoose"
import MongoMemoryServer from "mongodb-memory-server"
// eslint-disable-next-line jest/no-jasmine-globals
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000

let mongoServer
const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 60000,
  useNewUrlParser: true,
  useFindAndModify: false
}

beforeAll(async (done) => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  mongoose.Promise = global.Promise
  await mongoose.connect(mongoUri, mongooseOptions)

  return done()
})

afterAll(() => {
  mongoose.disconnect()
  mongoServer.stop()
})

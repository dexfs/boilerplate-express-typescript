import merge from "lodash/merge"
const {
  NODE_ENV: env = "development",
  SERVER_PORT: port = 3000,
  JWT_SECRET = "secret",
  JWT_EXPIRATION = 5000
} = process.env
const baseConfig = {
  env,
  port
}

const envConfig = {
  JWT_SECRET,
  JWT_EXPIRATION
}

export default merge(baseConfig, envConfig)

import merge from "lodash/merge"
const { NODE_ENV: env = "development", SERVER_PORT = 3000 } = process.env
const baseConfig = {
  env,
  port: SERVER_PORT
}

let envConfig = {}

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").config
    break
  case "test":
  case "testing":
    envConfig = require("./testing").config
    break
  default:
    envConfig = require("./prod").config
}

export default merge(baseConfig, envConfig)

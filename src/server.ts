import express from "express"
import { Request, Response, NextFunction } from "express"

import errorHandler from "errorhandler"
import { json, urlencoded } from "body-parser"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import config from "./config"
import projectInfo from "./../package.json"
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env.example" })

// Create Express server
export const app = express()

app.disable("x-powered-by")

app.use(
  urlencoded({
    extended: true
  })
)

app.use(json())
app.use(cors())
app.use(helmet())
app.use(
  morgan("dev", {
    skip: function() {
      return ["test", "testing"].includes(process.env.NODE_ENV)
    }
  })
)

// Routes without protection
app.get("/", (req: Request, res: Response) => {
  res.json({
    project: projectInfo.name,
    version: projectInfo.version
  })
})
//Routes with protection

//Error handle
if (config.env === "development") {
  app.use(errorHandler)
} else {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send("Server Error")
  })
}

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}`)
    })
  } catch (e) {
    console.error(`Server Error ${e}`)
  }
}

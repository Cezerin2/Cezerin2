import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import responseTime from "response-time"
import winston from "winston"
import ajaxRouter from "./ajaxRouter"
import apiRouter from "./apiRouter"
import dashboardWebSocket from "./lib/dashboardWebSocket"
import { sendResponse } from "./lib/logger"
import security from "./lib/security"
import settings from "./lib/settings"

const app = express()

security.applyMiddleware(app)
app.set("trust proxy", 1)
app.use(helmet({ contentSecurityPolicy: false }))
app.use(
  cors({
    origin: security.getAccessControlAllowOrigin(),
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization",
    credentials: true,
  })
)
app.use(responseTime())
app.use(cookieParser(settings.cookieSecretKey))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/ajax", ajaxRouter)
app.use("/api", apiRouter)
app.use(sendResponse)

const server = app.listen(settings.apiListenPort, () => {
  const serverAddress = server.address()
  if (typeof serverAddress !== "string")
    winston.info(`API running at http://localhost:${serverAddress.port}`)
})

dashboardWebSocket.listen(server)

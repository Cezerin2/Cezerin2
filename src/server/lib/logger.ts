import { Middleware, RouterContext } from "@koa/router"
import winston from "winston"

const logsFile = "../../logs/server.log"

const logger = winston.configure({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "info",
      handleExceptions: true,
      format: winston.format.json(),
      filename: logsFile,
    }),
  ],
})

const getResponse = message => ({
  error: true,
  message,
})

const logUnauthorizedRequests = (ctx: RouterContext) => {
  // todo
}

export const sendResponse: Middleware = (ctx, next) => {
  // if (error && error.name === "UnauthorizedError") {
  logUnauthorizedRequests(ctx)
  // ctx.body = getResponse(error.message)
  ctx.status = 401
  // } else if (error) {
  // winston.error(error.stack)
  // ctx.body = getResponse(error.message)
  ctx.status = 500
  // } else {
  next()
  // }
}

export default logger

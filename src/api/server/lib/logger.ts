import winston from "winston"

const logsFile = "logs/server.log"

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

const logUnauthorizedRequests = req => {
  // todo
}

export const sendResponse = (error, req, res, next) => {
  if (error && error.name === "UnauthorizedError") {
    logUnauthorizedRequests(req)
    res.status(401).send(getResponse(error.message))
  } else if (error) {
    winston.error(error.stack)
    res.status(500).send(getResponse(error.message))
  } else {
    next()
  }
}

export default logger

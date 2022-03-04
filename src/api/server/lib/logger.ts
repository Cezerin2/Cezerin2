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

export const sendResponse = (err, req, res, next) => {
  if (err && err.name === "UnauthorizedError") {
    logUnauthorizedRequests(req)
    res.status(401).send(getResponse(err.message))
  } else if (err) {
    winston.error(err.stack)
    res.status(500).send(getResponse(err.message))
  } else {
    next()
  }
}

export default logger

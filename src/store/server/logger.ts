import winston from "winston"

const logsFile = "logs/server.log"

winston.configure({
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

export default {}

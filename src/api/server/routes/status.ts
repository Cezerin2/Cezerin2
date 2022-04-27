import { exec } from "child_process"
import { Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"

const router = Router()

const getStatus = (req: Request, res: Response) =>
  res.status(200).send("The Server is Working very well!")

// TODO: Also add ./config get/update feature

// TODO
const getUpdates = (req: Request, res: Response) => {
  exec("git pull", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  exec("yarn", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  exec("yarn theme:compile", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  exec("yarn add ./theme", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  exec("yarn build", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  exec("pm2 restart all", (error, stdout, stderr) => {
    if (error) {
      winston.error(error)
      return
    }
    winston.info(stdout)
  })

  winston.info("Cezerin has been updated!")
  res.status(200).send("Cezerin has been updated!")
}

router
  .get(
    "/v1/status",
    security.checkUserScope(security.scope.READ_SETTINGS),
    getStatus
  )
  // TODO
  .get(
    "/v1/status/update",
    security.checkUserScope(security.scope.READ_SETTINGS)
    // getUpdates
  )

export default router

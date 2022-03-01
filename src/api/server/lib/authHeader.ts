import jwt from "jsonwebtoken"
import serverConfigs from "../../../../config/server"

const cert = serverConfigs.jwtSecretKey

const encodeUserLoginAuth = (userID: string) => jwt.sign({ userID }, cert)

const decodeUserLoginAuth = (token: string) => {
  try {
    return jwt.verify(token, cert)
  } catch (error) {
    return error
  }
}

const encodeUserPassword = (token: string) =>
  jwt.sign({ password: token }, cert)

const decodeUserPassword = (token: string) =>
  jwt.verify(token, cert) as { password: string }

export {
  encodeUserLoginAuth,
  decodeUserLoginAuth,
  encodeUserPassword,
  decodeUserPassword,
}

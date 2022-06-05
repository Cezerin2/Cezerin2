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

export { encodeUserLoginAuth, decodeUserLoginAuth }

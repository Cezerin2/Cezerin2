import jwt from "jsonwebtoken"
// import serverConfigs from "../../../../config/server"

// key to sign tokens
const jwtSecretKey = "-"
const cert = jwtSecretKey
// const cert = serverConfigs.jwtSecretKey

class AuthHeader {
  encodeUserPassword(token) {
    return jwt.sign({ password: token }, cert)
  }
}

export default new AuthHeader()

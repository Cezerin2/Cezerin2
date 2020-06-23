import jwt from "jsonwebtoken"

const cert = process.env.CONFIG_JWT_SECRET_KEY
class AuthHeader {
  encodeUserPassword(token) {
    return jwt.sign({ password: token }, cert)
  }
}
export default new AuthHeader()

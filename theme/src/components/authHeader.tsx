import jwt from "jsonwebtoken"
// import serverConfigs from "../../../../config/server"

// key to sign tokens
const jwtSecretKey = "-"
const cert = jwtSecretKey
// const cert = serverConfigs.jwtSecretKey

export const encodeUserPassword = (token: string) =>
  jwt.sign({ password: token }, cert)

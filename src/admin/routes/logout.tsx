import * as auth from "lib/auth"
import { FC, useEffect } from "react"

const Logout: FC = () => {
  useEffect(() => {
    auth.removeToken()
  }, [])

  return null
}

export default Logout

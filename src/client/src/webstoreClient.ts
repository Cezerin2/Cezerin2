import fetch from "cross-fetch"
import RestClient, { returnStatusAndJson } from "./restClient"

export const authorize = (email: string, adminUrl: string) => {
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, admin_url: adminUrl }),
  }

  return fetch("https://api.cezerin.com/v1/account/authorize", config).then(
    returnStatusAndJson
  )
}

export const WebStoreClient = ({ token }: { token: string }) => {
  const client = RestClient("https://api.cezerin.com/v1", token)

  return { ...client, authorize }
}

export default WebStoreClient

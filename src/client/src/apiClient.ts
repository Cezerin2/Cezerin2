import fetch from "cross-fetch"
import RestClient from "./restClient"

class ApiClient extends RestClient {
  static authorize = (baseUrl, email) => {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
    return fetch(`${baseUrl}/authorize`, config).then(
      RestClient.returnStatusAndJson
    )
  }
}

export default ApiClient

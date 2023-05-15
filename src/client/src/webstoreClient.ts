import fetch from "cross-fetch"
import RestClient from "./restClient"

class WebStoreClient extends RestClient {
  constructor(options) {
    super({ baseUrl: "https://api.cezerin.com/v1", token: options.token })
  }

  static authorize = (email, adminUrl) => {
    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, admin_url: adminUrl }),
    }

    return fetch("https://api.cezerin.com/v1/account/authorize", config).then(
      RestClient.returnStatusAndJson
    )
  }
}

export default WebStoreClient

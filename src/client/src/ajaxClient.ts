import { RestClient } from "./restClient"

export const AjaxClient = (baseUrl: string, token?: string) => {
  const client = RestClient(baseUrl, token)

  const getCredentialsConfig = (toParseBaseURL: string) => {
    const includePrefix =
      toParseBaseURL.includes("http://") || toParseBaseURL.includes("https://")
    return includePrefix ? "include" : "same-origin"
  }

  const getConfig = (method, data, cookie) => {
    const config = {
      credentials: getCredentialsConfig(baseUrl),
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: data && JSON.stringify(data),
    }

    return config
  }

  return { ...client, getConfig, getCredentialsConfig }
}

export default AjaxClient

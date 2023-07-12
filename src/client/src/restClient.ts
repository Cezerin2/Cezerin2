import fetch from "cross-fetch"
import queryString from "query-string"

export const returnStatusAndJson = response =>
  response
    .json()
    .then(json => ({ status: response.status, json }))
    .catch(() => ({ status: response.status, json: null }))

export const RestClient = (baseUrl: string, token?: string) => {
  const getConfig = (method: string, data?) => {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    }

    return config
  }

  const postFormDataConfig = formData => ({
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    getConfig,
    postFormDataConfig,
    returnStatusAndJson,

    get: (endpoint: string, filter?) =>
      fetch(
        `${baseUrl}${endpoint}?${queryString.stringify(filter)}`,
        getConfig("get", null)
      ).then(returnStatusAndJson),
    post: (endpoint: string, data?) =>
      fetch(baseUrl + endpoint, getConfig("post", data)).then(
        returnStatusAndJson
      ),
    postFormData: (endpoint: string, formData) =>
      fetch(baseUrl + endpoint, postFormDataConfig(formData)).then(
        returnStatusAndJson
      ),
    put: (endpoint: string, data?) =>
      fetch(baseUrl + endpoint, getConfig("put", data)).then(
        returnStatusAndJson
      ),
    delete: (endpoint: string) =>
      fetch(baseUrl + endpoint, getConfig("delete")).then(returnStatusAndJson),
  }
}

export default RestClient

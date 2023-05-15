import fetch from "cross-fetch"
import queryString from "query-string"

interface Client {
  baseUrl: string
  token?: string
}

class RestClient {
  baseUrl: string
  token?: string

  constructor({ baseUrl, token }: Client) {
    this.baseUrl = baseUrl
    this.token = token
  }

  getConfig(method: string, data?, cookie?) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    }

    return config
  }

  postFormDataConfig = formData => ({
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  })

  returnStatusAndJson = response =>
    response
      .json()
      .then(json => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }))

  static returnStatusAndJsonStatic = response =>
    response
      .json()
      .then(json => ({ status: response.status, json }))
      .catch(() => ({ status: response.status, json: null }))

  get(endpoint: string, filter?, cookie?) {
    return fetch(
      `${this.baseUrl}${endpoint}?${queryString.stringify(filter)}`,
      this.getConfig("get", null, cookie)
    ).then(this.returnStatusAndJson)
  }

  post(endpoint: string, data?) {
    return fetch(this.baseUrl + endpoint, this.getConfig("post", data)).then(
      this.returnStatusAndJson
    )
  }

  postFormData(endpoint: string, formData) {
    return fetch(
      this.baseUrl + endpoint,
      this.postFormDataConfig(formData)
    ).then(this.returnStatusAndJson)
  }

  put(endpoint: string, data?) {
    return fetch(this.baseUrl + endpoint, this.getConfig("put", data)).then(
      this.returnStatusAndJson
    )
  }

  delete(endpoint: string) {
    return fetch(this.baseUrl + endpoint, this.getConfig("delete")).then(
      this.returnStatusAndJson
    )
  }
}

export default RestClient

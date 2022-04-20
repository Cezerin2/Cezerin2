import messages from "./text"

const loginPath = "/admin/login"
const homePath = "/admin/"

const getParameterByName = (name: string, url?: string) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const validateCurrentToken = () => {
  if (location.pathname !== loginPath) {
    if (!isCurrentTokenValid()) {
      location.replace(loginPath)
    }
  }
}

export const checkTokenFromUrl = () => {
  if (location.pathname === loginPath) {
    const token = getParameterByName("token")
    if (token && token !== "") {
      const tokenData = parseJWT(token)

      if (tokenData) {
        const expiration_date = tokenData.exp * 1000
        if (expiration_date > Date.now()) {
          saveToken({ token, email: tokenData.email, expiration_date })
          location.replace(homePath)
        } else {
          alert(messages.tokenExpired)
        }
      } else {
        alert(messages.tokenInvalid)
      }
    } else {
      if (isCurrentTokenValid()) {
        location.replace(homePath)
      }
    }
  }
}

const parseJWT = jwt => {
  try {
    const payload = jwt.split(".")[1]
    const tokenData = JSON.parse(atob(payload))
    return tokenData
  } catch (error) {
    return null
  }
}

const saveToken = data => {
  localStorage.setItem("dashboard_token", data.token)
  localStorage.setItem("dashboard_email", data.email)
  localStorage.setItem("dashboard_exp", data.expiration_date)
}

const isCurrentTokenValid = () => {
  const expiration_date = localStorage.getItem("dashboard_exp")
  return (
    localStorage.getItem("dashboard_token") &&
    expiration_date &&
    expiration_date > Date.now()
  )
}

export const removeToken = () => {
  localStorage.removeItem("dashboard_token")
  localStorage.removeItem("dashboard_email")
  localStorage.removeItem("dashboard_exp")
  localStorage.removeItem("webstore_token")
  localStorage.removeItem("webstore_email")
  localStorage.removeItem("webstore_exp")
  location.replace(loginPath)
}

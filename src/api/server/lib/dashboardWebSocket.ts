import { Server } from "http"
import url from "url"
import WebSocket from "ws"
import security from "./security"

let wss = null

const listen = (server: Server) => {
  wss = new WebSocket.Server({
    path: "/ws/dashboard", //Accept only connections matching this path
    maxPayload: 1024, //The maximum allowed message size
    backlog: 100, //The maximum length of the queue of pending connections.
    verifyClient: verifyClient, //An hook to reject connections
    server, //A pre-created HTTP/S server to use
  })

  wss.on("connection", onConnection)
  wss.broadcast = broadcastToAll
}

const getTokenFromRequestPath = requestPath => {
  try {
    const urlObj = url.parse(requestPath, true)
    return urlObj.query.token
  } catch (error) {
    console.error(error)
    return null
  }
}

const verifyClient = async (info, done) => {
  if (security.DEVELOPER_MODE === true) {
    done(true)
  } else {
    const requestPath = info.req.url
    const token = getTokenFromRequestPath(requestPath)
    try {
      // TODO: check access to dashboard
      await security.verifyToken(token) // returns tokenDecoded
      done(true)
    } catch (error) {
      done(false, 401)
    }
  }
}

const onConnection = (ws: WebSocket, req) => {
  // TODO: ws.user = token.email
  ws.on("error", console.error)
}

const broadcastToAll = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, console.error)
    }
  })
}

const send = ({ event, payload }) => {
  wss.broadcast(JSON.stringify({ event, payload }))
}

const events = {
  ORDER_CREATED: "order.created",
  THEME_INSTALLED: "theme.installed",
}

export default {
  listen: listen,
  send: send,
  events: events,
}

import winston from "winston"
import "./logger"
import settings from "./settings"

import server = require("./server")

let app = server.default

if (module.hot) {
  module.hot.accept("./server", async () => {
    winston.info("🔁  HMR Reloading `./server`...")

    try {
      app = (await import("./server")).default
    } catch (error) {
      winston.error(error)
    }
  })

  winston.info("✅  Server-side HMR Enabled!")
}

export default app.listen(settings.storeListenPort, () => {
  winston.info(`Store running at http://localhost:${settings.storeListenPort}`)
})

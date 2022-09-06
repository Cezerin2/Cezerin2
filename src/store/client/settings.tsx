import { readFileSync } from "fs-extra"
import YAML from "yaml"
import { Store } from "../../../config/types/store"

let settings: Store
;(async () => {
  if (typeof window === "undefined") {
    const file = readFileSync("./config/store.yml", "utf8")
    settings = YAML.parse(file) as Store
    return
  }

  const config = require("../../../config/store.yml")
  settings = config.default
})()

export default settings

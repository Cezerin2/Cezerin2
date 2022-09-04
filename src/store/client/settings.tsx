import { readFileSync } from "fs-extra"
import YAML from "yaml"
import { Store } from "../../../config/types/store"

const file = readFileSync("./config/store.yml", "utf8")
const settings = YAML.parse(file) as Store

export default settings

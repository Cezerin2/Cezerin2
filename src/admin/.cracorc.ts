import { CracoConfig } from "@craco/types"
import { resolve } from "path"

const config: CracoConfig = {
  paths: config => {
    if (config) config.appBuild = resolve("../../public/admin")

    return config
  },
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
}

export default config

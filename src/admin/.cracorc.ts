import { CracoConfig } from "@craco/types"
import CracoCSSModules from "craco-css-modules"

const config: CracoConfig = {
  plugins: [{ plugin: CracoCSSModules }],
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false,
  },
}

export default config

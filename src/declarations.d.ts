declare module "*/admin.yml" {
  const data: import("../config/types/admin").Admin

  export default data
}

declare module "*/server.yml" {
  const data: import("../config/types/server").Server

  export default data
}

declare module "*/store.yml" {
  const data: import("../config/types/store").Store

  export default data
}

import { Server } from "../../../config/types/server"

const config = process.env.SERVER_CONFIG as unknown as Server

export default config

import { MediasoupClient } from "./mediasoupClient"
import { ws } from "../sockets/sockets"

export const client = new MediasoupClient(ws);
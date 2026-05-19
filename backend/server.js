import app from "./src/app.js"
import http from "node:http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import db from "./src/models/index.js"
import { setupSocket } from "./src/socket/chat.js"

dotenv.config()

const PORT = process.env.PORT || 8080

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      "https://nekaherts.vercel.app",
      "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["polling", "websocket"]
})

setupSocket(io)

async function start() {
  try {
    await db.sequelize.authenticate()
    await db.sequelize.sync()

    server.listen(PORT, "0.0.0.0", () => {
      console.log("🚀 Server rodando na porta", PORT)
    })

  } catch (err) {
    console.error("Erro server:", err)
  }
}

start()
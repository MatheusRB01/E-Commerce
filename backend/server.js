import app from "./src/app.js"
import http from "node:http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import db from "./src/models/index.js"
import { setupSocket } from "./src/socket/chat.js"
import fs from "fs"

dotenv.config()

if (!fs.existsSync("uploads")) {
fs.mkdirSync("uploads")
}


const PORT = process.env.PORT || 8080

const server = http.createServer(app)

const allowedOrigins = [
  "https://nekaherts.vercel.app",
  "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
]

// 🔥 SOCKET IO (CORRIGIDO)
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.log("❌ Socket bloqueado:", origin)
      return callback(null, false)
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
})

setupSocket(io)

// 🔥 START SERVER
async function start() {
  try {
    await db.sequelize.authenticate()
    console.log("✅ Banco conectado")

    await db.sequelize.sync()
    console.log("🔥 Banco sincronizado")

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server rodando na porta ${PORT}`)
    })

  } catch (err) {
    console.error("❌ Erro server:", err)
  }
}

start()
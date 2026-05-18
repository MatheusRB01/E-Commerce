import app from "./src/app.js"
import dotenv from "dotenv"
import http from "node:http"
import { Server } from "socket.io"
import fs from "fs"

import db from "./src/models/index.js"
import { setupSocket } from "./src/socket/chat.js"

dotenv.config()

const PORT = process.env.PORT || 8080

// uploads
const uploadDir = "./uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// server
const server = http.createServer(app)

// socket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
})

setupSocket(io)

// start
const start = async () => {
  try {
    await db.sequelize.authenticate()
    console.log("✅ Banco conectado")

    await db.sequelize.sync({ alter: true })
    console.log("🔥 Banco sincronizado")

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })

  } catch (err) {
    console.error("❌ Erro ao iniciar:", err)
  }
}

start()
import app from "./src/app.js"
import dotenv from "dotenv"
import http from "node:http"
import { Server } from "socket.io"
import sequelize from "./src/config/database.js"
import fs from "fs"

dotenv.config()

const PORT = process.env.PORT || 8080

const uploadDir = "./uploads"
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "https://nekaherts.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
})

// socket
import { setupSocket } from "./src/socket/chat.js"
setupSocket(io)

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log("✅ Banco conectado")

    const db = (await import("./src/models/index.js")).default
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
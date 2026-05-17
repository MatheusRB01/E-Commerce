import app from "./src/app.js"
import dotenv from "dotenv"
import http from "node:http"
import { Server } from "socket.io"
import db from "./src/models/index.js"
import userRoutes from "./src/routes/user.router.js"
import { setupSocket } from "./src/socket/chat.js"
import fs from "fs"

dotenv.config()

// ============================
// ROTAS
// ============================
app.use("/usuarios", userRoutes)

// ============================
// PORTA (RENDER SAFE)
// ============================
const PORT = process.env.PORT || 3000

// ============================
// UPLOADS (evita crash)
// ============================
const uploadDir = "./uploads"

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// ============================
// HTTP SERVER
// ============================
const server = http.createServer(app)

// ============================
// SOCKET.IO
// ============================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

console.log("DB_HOST =", process.env.DB_HOST)
console.log("DB_PORT =", process.env.DB_PORT)
console.log("DB_USER =", process.env.DB_USER)
console.log("DB_NAME =", process.env.DB_NAME)
setupSocket(io)

// ============================
// START APP SEGURO
// ============================
const start = async () => {
  try {
  setupSocket(io)
  console.log("🟢 Socket iniciado")
} catch (err) {
  console.error("🔴 Socket falhou:", err.message)
}

  // Server SEMPRE sobe (mesmo se DB falhar)
  server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  })
}

start()
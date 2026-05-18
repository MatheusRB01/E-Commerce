import app from "./src/app.js"
import dotenv from "dotenv"
import http from "node:http"
import { Server } from "socket.io"
import sequelize from "./src/models/index.js"
import userRoutes from "./src/routes/user.router.js"
import { setupSocket } from "./src/socket/chat.js"
import fs from "node:fs"
import path from "node:path"

dotenv.config()

// ========================================
// ENV DEBUG
// ========================================

console.log({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE
})

// ========================================
// GLOBAL ERROR HANDLERS
// ========================================

process.on("unhandledRejection", (reason) => {
  console.error("❌ UNHANDLED REJECTION")
  console.error(reason)
})

process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION")
  console.error(err)
})

// ========================================
// PORT
// ========================================

const PORT = process.env.PORT || 8080

// ========================================
// UPLOADS
// ========================================

const uploadDir = path.resolve("uploads")

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
  console.log("📁 Pasta uploads criada")
}

// ========================================
// ROUTES
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    message: "API ONLINE 🚀"
  })
})

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  })
})

app.use("/usuarios", userRoutes)

// ========================================
// HTTP SERVER
// ========================================

const server = http.createServer(app)

// ========================================
// SOCKET.IO
// ========================================

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },

  transports: ["websocket", "polling"],

  pingTimeout: 60000,
  pingInterval: 25000
})

// ========================================
// SOCKET START
// ========================================

try {
  setupSocket(io)
  console.log("🟢 Socket iniciado")
} catch (err) {
  console.error("🔴 Erro ao iniciar socket")
  console.error(err)
}

// ========================================
// START SERVER
// ========================================

const startServer = async () => {

  // SERVER SOBE PRIMEIRO
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  })

  // DEPOIS conecta banco
  try {

    await sequelize.authenticate()

    console.log("✅ Banco conectado")

    // opcional
    // await sequelize.sync()

  } catch (err) {

    console.error("❌ Erro ao conectar banco")
    console.error(err)

  }
}

startServer()
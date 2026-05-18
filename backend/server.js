import app from "./src/app.js"
import dotenv from "dotenv"
import http from "node:http"
import { Server } from "socket.io"
import sequelize from "./src/models/index.js"
import userRoutes from "./src/routes/user.router.js"
import { setupSocket } from "./src/socket/chat.js"
import fs from "fs"

dotenv.config()

// ============================
// ROTAS
// ============================
app.use("/usuarios", userRoutes)

// ============================
// HEALTH CHECK
// ============================
app.get("/", (req, res) => {
  res.send("API ONLINE 🚀")
})

// ============================
// PORTA
// ============================
const PORT = process.env.PORT || 3000

// ============================
// UPLOADS
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
    origin: "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
})

// SOCKET UMA VEZ
setupSocket(io)

// ============================
// START APP
// ============================
const start = async () => {

  try {
    await sequelize.authenticate()
    console.log("✅ Banco conectado")
  } catch (err) {
    console.error("❌ Erro no banco:", err.message)
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  })
}

start()
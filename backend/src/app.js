import express from "express"
import cors from "cors"

import {
  produtoRoutes,
  authRoutes,
  adminRouters,
  chatRoutes,
  router
} from "./routes/index.js"

const app = express()

// 🔥 USE UM ÚNICO BACKEND URL NO PROJETO TODO
const allowedOrigins = [
  "https://nekaherts.vercel.app",
  "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
]

// ======================
// CORS CORRIGIDO
// ======================
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

// preflight
app.options("*", cors())

app.use(express.json())

// ======================
// ROTAS
// ======================
app.use("/produtos", produtoRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRouters)
app.use("/chat", chatRoutes)
app.use("/usuarios", router)

// uploads
app.use("/uploads", express.static("uploads"))

export default app
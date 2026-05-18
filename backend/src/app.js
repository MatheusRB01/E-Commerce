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

const allowedOrigins = [
  "https://nekaherts.vercel.app",
  "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
]

// ======================
// CORS (CORRIGIDO)
// ======================
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.log("❌ Bloqueado por CORS:", origin)
    return callback(null, false)
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

// 🔥 IMPORTANTE (resolve preflight)
app.options(/.*/, cors())

app.use(express.json())

// ======================
// ROTAS
// ======================
app.use("/produtos", produtoRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRouters)
app.use("/chat", chatRoutes)
app.use("/usuarios", router)

// ======================
// UPLOADS
// ======================
app.use("/uploads", express.static("uploads"))

export default app
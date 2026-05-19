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
  "https://nekaharts.vercel.app",
  "https://nekaharts-htbkxaszc-mathues01s-projects.vercel.app"
]

// CORS
app.use(cors({
  origin: function (origin, callback) {

    if (!origin) {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.log("❌ CORS bloqueado:", origin)

    return callback(new Error("Not allowed by CORS"))
  },

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],

  credentials: true
}))

// ✅ EXPRESS 5 SAFE
app.options(/.*/, cors())

app.use(express.json())

// ROTAS
app.use("/produtos", produtoRoutes)
app.use("/auth", authRoutes)
app.use("/admin", adminRouters)
app.use("/chat", chatRoutes)
app.use("/usuarios", router)

// UPLOADS
app.use("/uploads", express.static("uploads"))

export default app
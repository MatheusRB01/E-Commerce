import express from 'express'
import cors from 'cors'
import { produtoRoutes, authRoutes, adminRouters, chatRoutes, router} from './routes/index.js'

const app = express()

const allowedOrigins = [
  "https://nekaherts.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    // 🔥 permite requests sem origin (Railway / socket / preflight)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.log("CORS BLOQUEADO:", origin)
    return callback(null, false)
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

// 🔥 ISSO É O QUE ESTAVA FALTANDO DE VERDADE
app.options("*", cors({
  origin: allowedOrigins
}))

app.use(express.json())

app.use('/produtos', produtoRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRouters)
app.use('/chat', chatRoutes)
app.use('/usuarios', router)



app.use('/uploads', express.static('uploads'))

export default app
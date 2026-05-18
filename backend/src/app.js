import express from 'express'
import cors from 'cors'
import { produtoRoutes, authRoutes, adminRouters, chatRoutes, router} from './routes/index.js'

const app = express()

const allowedOrigins = [
  "https://nekaherts.vercel.app",
  "https://nekaherts-lo8kxxcat-mathues01s-projects.vercel.app"
]

app.use(cors({
  origin: function (origin, callback) {
    // permite requests sem origin (Postman, mobile, etc)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error("CORS blocked: " + origin), false)
  },
  credentials: true
}))
app.use(express.json())

app.use('/produtos', produtoRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRouters)
app.use('/chat', chatRoutes)
app.use('/usuarios', router)



app.use('/uploads', express.static('uploads'))

export default app
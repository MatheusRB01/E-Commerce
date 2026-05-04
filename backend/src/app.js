import express from 'express'
import cors from 'cors'
import { produtoRoutes, authRoutes } from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/produtos', produtoRoutes)
app.use('/auth', authRoutes)

app.use('/uploads', express.static('uploads'))

export default app
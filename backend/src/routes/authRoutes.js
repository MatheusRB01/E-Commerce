import { Router } from 'express'
import { register, login, listUsers} from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const router = Router()

// Cadastro
router.post('/register', register)

// Login
router.post('/login', login)

// Rota protegida (qualquer usuário logado)
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    message: 'Acesso permitido',
    user: req.user
  })
})

// Rota protegida só para admin
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.json({
    message: 'Área do admin'
  })
})

router.get('/users', verifyToken, isAdmin, listUsers)

export default router
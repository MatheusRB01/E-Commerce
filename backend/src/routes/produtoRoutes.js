import { Router } from 'express'
import upload from '../config/upload.js'
import {
  listar,
  buscar,
  criar,
  atualizar,
  deletar
} from '../controllers/produtoController.js'

const router = Router()

router.get('/', listar)
router.get('/:id', buscar)
router.post('/', upload.single('imagem'), criar)
router.put('/:id', upload.single('imagem'), atualizar)
router.delete('/:id', deletar)

export default router
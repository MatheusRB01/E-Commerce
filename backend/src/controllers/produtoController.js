import * as Produto from '../models/produtoModel.js'
import fs from 'fs'
import path from 'path'

export const listar = (req, res) => {
  Produto.getAll((err, results) => {
    if (err) return res.status(500).json(err)
    res.json(results)
  })
}

export const buscar = (req, res) => {
  Produto.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err)
    res.json(results[0])
  })
}

export const criar = (req, res) => {
  const { nome, preco, descricao } = req.body

  const imagem = req.file ? req.file.filename : null

  const produto = {
    nome,
    preco,
    descricao,
    imagem
  }

  Produto.create(produto, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json(err)
    }

    res.status(201).json({
      message: 'Produto criado',
      id: result.insertId
    })
  })
}

export const atualizar = (req, res) => {
  const id = req.params.id
  const { nome, preco, descricao } = req.body

  Produto.getById(id, (err, results) => {
    if (err) return res.status(500).json(err)

    const produtoAtual = results[0]

    if (!produtoAtual) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    let imagem = produtoAtual.imagem

    if (req.file) {
      
      if (produtoAtual.imagem) {
        const caminho = path.resolve('uploads', produtoAtual.imagem)

        if (fs.existsSync(caminho)) {
          fs.unlinkSync(caminho)
        }
      }

      imagem = req.file.filename
    }

    const produtoAtualizado = {
      nome,
      preco,
      descricao,
      imagem
    }

    Produto.update(id, produtoAtualizado, (err) => {
      if (err) return res.status(500).json(err)

      res.json({ message: 'Produto atualizado com sucesso' })
    })
  })
}

export const deletar = (req, res) => {
  const id = req.params.id

  // 1. Buscar produto
  Produto.getById(id, (err, results) => {
    if (err) return res.status(500).json(err)

    const produto = results[0]

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    // 2. Deletar imagem se existir
    if (produto.imagem) {
      const caminho = path.resolve('uploads', produto.imagem)

      fs.unlink(caminho, (err) => {
        if (err) {
          console.warn('Erro ao deletar imagem:', err)
        }
      })
    }

    // 3. Deletar do banco
    Produto.remove(id, (err) => {
      if (err) return res.status(500).json(err)

      res.json({ message: 'Produto e imagem deletados' })
    })
  })
}
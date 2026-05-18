import * as Produto from '../models/produtoModel.js'
import fs from 'fs'
import path from 'path'

// LISTAR
export const listar = async (req, res) => {
  try {
    const results = await Produto.getAll()
    res.json(results)
  } catch (err) {
    res.status(500).json(err)
  }
}

// BUSCAR
export const buscar = async (req, res) => {
  try {
    const result = await Produto.getById(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(500).json(err)
  }
}

// CRIAR
export const criar = async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body
    const imagem = req.file ? req.file.filename : null

    const result = await Produto.create({
      nome,
      preco,
      descricao,
      imagem
    })

    res.status(201).json({
      message: 'Produto criado',
      id: result.insertId
    })

  } catch (err) {
    res.status(500).json(err)
  }
}

// ATUALIZAR
export const atualizar = async (req, res) => {
  try {
    const id = req.params.id
    const { nome, preco, descricao } = req.body

    const produtoAtual = await Produto.getById(id)

    if (!produtoAtual) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    let imagem = produtoAtual.imagem

    if (req.file) {
      if (produtoAtual.imagem) {
        const caminho = path.resolve('uploads', produtoAtual.imagem)
        if (fs.existsSync(caminho)) fs.unlinkSync(caminho)
      }
      imagem = req.file.filename
    }

    await Produto.update(id, {
      nome,
      preco,
      descricao,
      imagem
    })

    res.json({ message: 'Produto atualizado com sucesso' })

  } catch (err) {
    res.status(500).json(err)
  }
}

// DELETAR
export const deletar = async (req, res) => {
  try {
    const id = req.params.id

    const produto = await Produto.getById(id)

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    if (produto.imagem) {
      const caminho = path.resolve('uploads', produto.imagem)
      if (fs.existsSync(caminho)) fs.unlinkSync(caminho)
    }

    await Produto.remove(id)

    res.json({ message: 'Produto e imagem deletados' })

  } catch (err) {
    res.status(500).json(err)
  }
}
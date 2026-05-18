import fs from "fs"
import path from "path"
import sequelize from "../database/index.js" // ajuste se o seu caminho for outro
import initProduto from "../models/produtoModel.js"

const Produto = initProduto(sequelize, sequelize.Sequelize.DataTypes)


// =========================
// LISTAR
// =========================
export const listar = async (req, res) => {
  try {
    const results = await Produto.findAll()
    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


// =========================
// BUSCAR POR ID
// =========================
export const buscar = async (req, res) => {
  try {
    const result = await Produto.findByPk(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// =========================
// CRIAR
// =========================
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
      message: "Produto criado",
      id: result.id
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


// =========================
// ATUALIZAR
// =========================
export const atualizar = async (req, res) => {
  try {
    const id = req.params.id
    const { nome, preco, descricao } = req.body

    const produtoAtual = await Produto.findByPk(id)

    if (!produtoAtual) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }

    let imagem = produtoAtual.imagem

    if (req.file) {
      if (produtoAtual.imagem) {
        const caminho = path.resolve("uploads", produtoAtual.imagem)
        if (fs.existsSync(caminho)) fs.unlinkSync(caminho)
      }
      imagem = req.file.filename
    }

    await Produto.update(
      { nome, preco, descricao, imagem },
      { where: { id } }
    )

    res.json({ message: "Produto atualizado com sucesso" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}


// =========================
// DELETAR
// =========================
export const deletar = async (req, res) => {
  try {
    const id = req.params.id

    const produto = await Produto.findByPk(id)

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }

    if (produto.imagem) {
      const caminho = path.resolve("uploads", produto.imagem)
      if (fs.existsSync(caminho)) fs.unlinkSync(caminho)
    }

    await Produto.destroy({ where: { id } })

    res.json({ message: "Produto deletado com sucesso" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
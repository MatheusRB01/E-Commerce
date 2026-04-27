const API = 'http://localhost:3000/produtos'

const lista = document.getElementById('lista')

async function carregarProdutos() {
  try {
    const res = await fetch(API)
    const produtos = await res.json()

    lista.innerHTML = ''

    produtos.forEach(p => {
      const div = document.createElement('div')
      div.classList.add('produto')

      div.innerHTML = `
        <img src="http://localhost:3000/uploads/${p.imagem}" alt="${p.nome}">

        <div class="produto-content">
          <h3>${p.nome}</h3>
          <p>R$ ${p.preco}</p>
          <p>${p.descricao || ''}</p>
        </div>
      `

      lista.appendChild(div)
    })

  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
    lista.innerHTML = '<p>Erro ao carregar produtos</p>'
  }
}

carregarProdutos()
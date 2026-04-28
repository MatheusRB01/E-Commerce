const API = 'http://localhost:3000/produtos'

const form = document.getElementById('form')
const lista = document.querySelector('#lista')

async function carregarProdutos() {
  const res = await fetch(API)
  const produtos = await res.json()

  lista.innerHTML = ''

  produtos.forEach(p => {
    const div = document.createElement('div')
    div.classList.add('produto')

   div.innerHTML = `
    ${p.imagem ? `<img src="http://localhost:3000/uploads/${p.imagem}" alt="${p.nome}">` : ''}
    
    <div class="produto-content">
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco}</p>
        <p class="descricao">${p.descricao || ''}</p>
    </div>

    <button class="btn-delete" data-id="${p.id}">Excluir</button>
`;

    lista.appendChild(div)
  })
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id')
      await deletar(id)
    })
  })
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData()

  formData.append('nome', document.getElementById('nome').value)
  formData.append('preco', document.getElementById('valor').value)
  formData.append('descricao', document.getElementById('descri').value)

  const file = document.getElementById('imagem').files[0]
  if (file) {
    formData.append('imagem', file)
  }

  await fetch(API, {
    method: 'POST',
    body: formData
  })

  form.reset()
  carregarProdutos()
})

async function deletar(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  })

  carregarProdutos()
}

const inputImagem = document.getElementById('imagem')
const preview = document.getElementById('preview-img')
const container = document.getElementById('preview-container')
const texto = document.getElementById('upload-text')

inputImagem.addEventListener('change', () => {
  const file = inputImagem.files[0]

  if (!file) return

  const url = URL.createObjectURL(file)

  preview.src = url
  container.style.display = 'block'

  texto.textContent = `📁 ${file.name}`
})

carregarProdutos()
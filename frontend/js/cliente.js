// ====================================
// CONFIG BASE (UM BACKEND SÓ)
// ====================================

const API = "https://e-commerce-production-b6bf.up.railway.app"

// ====================================
// AUTH
// ====================================

function checkAuth() {
  const token = localStorage.getItem("token")

  if (!token) {
    window.location.replace("login.html")
    return null
  }

  return token
}

const token = checkAuth()

// ====================================
// SOCKET
// ====================================

const socket = io(API, {
  auth: { token },
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000
})

// ====================================
// VARIÁVEIS
// ====================================

let usuarioLogado = null
const ADMIN_ID = 1

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

// ====================================
// SOCKET STATUS
// ====================================

socket.on("connect", () => {
  console.log("🟢 conectado")
})

socket.on("disconnect", () => {
  console.log("🔴 desconectado")
})

// ====================================
// USUÁRIO
// ====================================

async function carregarUsuario() {
  try {
    const res = await fetch(`${API}/auth/perfil`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error("Erro auth/perfil")
      return
    }

    const data = await res.json()
    usuarioLogado = data.user

    const userName = document.getElementById("userName")
    if (userName) {
      userName.innerHTML = `👤 ${usuarioLogado.nome}`
    }

    socket.emit("buscarMensagens", ADMIN_ID)

  } catch (err) {
    console.error("Erro usuário:", err)
  }
}

// ====================================
// PRODUTOS (CORRIGIDO)
// ====================================

async function carregarProdutos() {
  try {
    const res = await fetch(`${API}/produtos`)

    if (!res.ok) {
      console.error("Erro produtos:", await res.text())
      return
    }

    const data = await res.json()

    const produtos = Array.isArray(data) ? data : []

    const lista = document.getElementById("lista")
    if (!lista) return

    lista.innerHTML = ""

    produtos.forEach(p => {
      lista.innerHTML += `
        <div class="produto">

          <img src="${API}/uploads/${p.imagem}" />

          <div class="produto-content">

            <h3>${p.nome}</h3>

            <p>R$ ${Number(p.preco).toFixed(2)}</p>

            <p>${p.descricao || ""}</p>

            <button onclick='adicionarCarrinho(${JSON.stringify(p)})'>
              Adicionar ao carrinho
            </button>

          </div>

        </div>
      `
    })

  } catch (err) {
    console.error("Erro produtos:", err)
  }
}

// ====================================
// CARRINHO
// ====================================

function adicionarCarrinho(produto) {
  carrinho.push(produto)
  salvarCarrinho()
  atualizarCarrinho()
}

function removerCarrinho(index) {
  carrinho.splice(index, 1)
  salvarCarrinho()
  atualizarCarrinho()
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

function atualizarCarrinho() {
  const cartItems = document.getElementById("cart-items")
  const cartCount = document.getElementById("cart-count")
  const cartTotal = document.getElementById("cart-total")

  if (!cartItems) return

  cartItems.innerHTML = ""

  let total = 0

  carrinho.forEach((p, index) => {
    total += Number(p.preco)

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${API}/uploads/${p.imagem}" />

        <div>

          <h4>${p.nome}</h4>

          <p>R$ ${Number(p.preco).toFixed(2)}</p>

          <button onclick="removerCarrinho(${index})">
            remover
          </button>

        </div>

      </div>
    `
  })

  if (cartCount) cartCount.innerText = carrinho.length
  if (cartTotal) cartTotal.innerText = total.toFixed(2)
}

// ====================================
// FINALIZAR COMPRA
// ====================================

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  let msg = "🛒 Pedido%0A%0A"

  carrinho.forEach(p => {
    msg += `• ${p.nome} - R$ ${Number(p.preco).toFixed(2)}%0A`
  })

  const total = carrinho.reduce((a, i) => a + Number(i.preco), 0)

  msg += `%0ATotal: R$ ${total.toFixed(2)}`

  window.open(
    `https://wa.me/5511966733218?text=${msg}`,
    "_blank"
  )

  carrinho = []
  salvarCarrinho()
  atualizarCarrinho()
}

// ====================================
// CHAT
// ====================================

function mostrarMensagem(msg) {
  const box = document.getElementById("mensagens")
  if (!box) return

  const div = document.createElement("div")

  const mine =
    usuarioLogado &&
    msg.from &&
    Number(msg.from) === Number(usuarioLogado.id)

  div.classList.add("message")
  div.classList.add(mine ? "mine" : "other")

  div.innerText = msg.text

  box.appendChild(div)
  box.scrollTop = box.scrollHeight
}

socket.on("novaMensagem", mostrarMensagem)

socket.on("historicoMensagens", msgs => {
  const box = document.getElementById("mensagens")
  if (!box) return

  box.innerHTML = ""
  msgs.forEach(mostrarMensagem)
})

// ====================================
// ENVIAR MSG
// ====================================

function enviarMensagem() {
  const input = document.getElementById("inputMensagem")
  if (!input) return

  const text = input.value.trim()
  if (!text) return

  socket.emit("mensagem", {
    to: ADMIN_ID,
    text
  })

  input.value = ""
}

document.getElementById("btnEnviar")?.addEventListener("click", enviarMensagem)

document.getElementById("inputMensagem")?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault()
    enviarMensagem()
  }
})

// ====================================
// INIT
// ====================================

carregarUsuario()
carregarProdutos()
atualizarCarrinho()

// ====================================
// GLOBAL
// ====================================

window.adicionarCarrinho = adicionarCarrinho
window.removerCarrinho = removerCarrinho
window.finalizarCompra = finalizarCompra
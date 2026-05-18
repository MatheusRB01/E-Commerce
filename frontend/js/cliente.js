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

const socket = io(
  "https://e-commerce-production-b6bf.up.railway.app",
  {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000
  }
)

// ====================================
// VARIÁVEIS
// ====================================

let usuarioLogado = null
const ADMIN_ID = 1

let carrinho =
  JSON.parse(localStorage.getItem("carrinho")) || []

// ====================================
// SOCKET STATUS
// ====================================

socket.on("connect", () => {
  console.log("🟢 Cliente conectado")
})

socket.on("disconnect", () => {
  console.log("🔴 Cliente desconectado")
})

// ====================================
// USUÁRIO
// ====================================

async function carregarUsuario() {
  try {
    const res = await fetch(
      "https://e-commerce-production-b6bf.up.railway.app/auth/perfil",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (!res.ok) return

    const data = await res.json()

    usuarioLogado = data.user

    const userName = document.getElementById("userName")

    if (userName) {
      userName.innerHTML = `👤 ${usuarioLogado.nome}`
    }

    socket.emit("buscarMensagens", ADMIN_ID)

  } catch (err) {
    console.error(err)
  }
}

// ====================================
// PRODUTOS
// ====================================

async function carregarProdutos() {
  try {
    const res = await fetch(
      "https://e-commerce-production-b6bf.up.railway.app/produtos"
    )

    const data = await res.json()

    const produtos = Array.isArray(data) ? data : []

    const lista = document.getElementById("lista")

    if (!lista) return

    lista.innerHTML = ""

    produtos.forEach(p => {
      lista.innerHTML += `
        <div class="produto">

          <img
            src="https://e-commerce-production-b6bf.up.railway.app/uploads/${p.imagem}"
            alt="${p.nome}"
          >

          <div class="produto-content">

            <h3>${p.nome}</h3>

            <p class="preco">
              R$ ${Number(p.preco).toFixed(2)}
            </p>

            <p class="descricao">
              ${p.descricao || ""}
            </p>

            <button
              class="add-cart"
              onclick='adicionarCarrinho(${JSON.stringify(p)})'
            >
              Adicionar ao Carrinho
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
  carrinho.push({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    imagem: produto.imagem
  })

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

  carrinho.forEach((produto, index) => {
    total += Number(produto.preco)

    cartItems.innerHTML += `
      <div class="cart-item">

        <img
          src="https://e-commerce-production-b6bf.up.railway.app/uploads/${produto.imagem}"
          alt="${produto.nome}"
        >

        <div class="cart-info">

          <h4>${produto.nome}</h4>

          <p>R$ ${Number(produto.preco).toFixed(2)}</p>

          <button onclick="removerCarrinho(${index})">
            Remover
          </button>

        </div>

      </div>
    `
  })

  cartCount.innerText = carrinho.length
  cartTotal.innerText = total.toFixed(2)
}

// ====================================
// FINALIZAR COMPRA
// ====================================

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio")
    return
  }

  let mensagem = "🛒 *Novo Pedido*%0A%0A"

  carrinho.forEach(produto => {
    mensagem += `• ${produto.nome} - R$ ${Number(produto.preco).toFixed(2)}%0A`
  })

  const total = carrinho.reduce(
    (acc, item) => acc + Number(item.preco),
    0
  )

  mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`

  window.open(
    `https://wa.me/5511966733218?text=${mensagem}`,
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

  const minhaMensagem =
    usuarioLogado &&
    Number(msg.from) === Number(usuarioLogado.id)

  div.classList.add("message")

  div.classList.add(minhaMensagem ? "mine" : "other")

  div.innerText = msg.text

  box.appendChild(div)

  box.scrollTop = box.scrollHeight
}

socket.on("novaMensagem", msg => {
  mostrarMensagem(msg)
})

socket.on("historicoMensagens", mensagens => {
  const box = document.getElementById("mensagens")
  if (!box) return

  box.innerHTML = ""

  mensagens.forEach(msg => mostrarMensagem(msg))
})

// ====================================
// ENVIAR MSG
// ====================================

function enviarMensagem() {
  const input = document.getElementById("inputMensagem")
  if (!input) return

  const texto = input.value.trim()
  if (!texto) return

  socket.emit("mensagem", {
    to: ADMIN_ID,
    text: texto
  })

  input.value = ""
}

// ENTER
document.getElementById("inputMensagem")
  ?.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault()
      enviarMensagem()
    }
  })

document.getElementById("btnEnviar")
  ?.addEventListener("click", enviarMensagem)

// ====================================
// INIT
// ====================================

carregarUsuario()
carregarProdutos()
atualizarCarrinho()

// ====================================
// EXPORT GLOBAL
// ====================================

window.adicionarCarrinho = adicionarCarrinho
window.removerCarrinho = removerCarrinho
window.finalizarCompra = finalizarCompra
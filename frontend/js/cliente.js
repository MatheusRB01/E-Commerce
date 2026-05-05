/* =========================
🔐 PROTEÇÃO GLOBAL
========================= */
function checkAuth() {
  const token = localStorage.getItem("token")

  if (!token) {
    window.location.replace("login.html")
  }

  return token
}

const token = checkAuth()

/* =========================
🚪 LOGOUT
========================= */
const logoutBtn = document.querySelector(".logout")

if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault()

    localStorage.clear()

    window.location.replace("login.html")
  })
}

/* =========================
📦 CARREGAR PRODUTOS
========================= */
const API = "http://localhost:3000/produtos"
const lista = document.getElementById("lista")

async function carregarProdutos() {
  try {
    const res = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 401) {
      // token inválido ou expirado
      localStorage.clear()
      window.location.replace("login.html")
      return
    }

    const produtos = await res.json()

    lista.innerHTML = produtos.map(p => `
      <div class="produto">
        ${p.imagem ? `<img src="http://localhost:3000/uploads/${p.imagem}">` : ""}

        <div class="produto-content">
          <h3>${p.nome}</h3>
          <p>R$ ${p.preco}</p>
          <p>${p.descricao || ""}</p>
        </div>
      </div>
    `).join("")

  } catch (err) {
    console.error("Erro ao carregar produtos:", err)
  }
}

carregarProdutos()

/* =========================
🚫 BLOQUEAR BOTÃO VOLTAR
========================= */
window.history.pushState(null, null, window.location.href)
window.onpopstate = () => {
  window.history.go(1)
}


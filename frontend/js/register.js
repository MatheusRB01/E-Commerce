function setToken(token) {
  localStorage.setItem('token', token)
}

const registerForm = document.getElementById('registerForm')

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('regNome').value
    const email = document.getElementById('regEmail').value
    const senha = document.getElementById('regSenha').value
    const telefone = document.getElementById('regTell').value

    try {
      const res = await fetch('https://e-commerce-production-b6bf.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha, telefone })
      })

      // 🔥 PEGA RESPOSTA REAL (mesmo se der erro 500)
      const text = await res.text()
      console.log('RAW RESPONSE:', text)

      let data
      try {
        data = JSON.parse(text)
      } catch (err) {
        console.error('Resposta não é JSON válido:', text)
        alert('Erro inesperado no servidor')
        return
      }

      if (!res.ok) {
        console.error('Erro HTTP:', res.status, data)
        alert(data.error || 'Erro ao registrar usuário')
        return
      }

      if (data.token) {
        setToken(data.token)

        const payload = JSON.parse(atob(data.token.split('.')[1]))

        if (payload.role === 'admin') {
          window.location.href = 'index.html'
        } else {
          window.location.href = 'cliente.html'
        }
      } else {
        alert(data.error || 'Erro no cadastro')
      }

    } catch (error) {
      console.error('Erro de rede:', error)
      alert('Erro de conexão com o servidor')
    }
  })
}
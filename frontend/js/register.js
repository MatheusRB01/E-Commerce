const registerForm = document.getElementById('registerForm')

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('regNome').value
    const email = document.getElementById('regEmail').value
    const senha = document.getElementById('regSenha').value

    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Conta criada! Faça login.')

      // volta pro login
      registerFormEl.classList.remove("active")
      loginFormEl.classList.add("active")
    } else {
      alert(data.error || 'Erro ao cadastrar')
    }
  })
}
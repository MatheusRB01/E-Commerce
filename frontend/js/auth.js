const API = 'http://localhost:3000/auth'

// salvar token
export function setToken(token) {
  localStorage.setItem('token', token)
}

// pegar token
export function getToken() {
  return localStorage.getItem('token')
}

// remover token
export function logout() {
  localStorage.removeItem('token')
  window.location.href = 'login.html'
}

// verificar login automático
export function checkAuth() {
  const token = getToken()

  if (!token) {
    window.location.href = 'login.html'
  }

  return token
}
# 🛒 E-commerce Full Stack

Sistema completo de e-commerce com autenticação de usuários, controle de acesso e gerenciamento de produtos.

---

## 📌 Sobre o projeto

Este projeto foi desenvolvido com o objetivo de simular um ambiente real de e-commerce, contemplando tanto a experiência do cliente quanto o painel administrativo.

A aplicação possui dois níveis de acesso:

* 👤 **Cliente**: pode se cadastrar, fazer login e visualizar produtos
* 🔐 **Administrador**: possui acesso total ao sistema, podendo gerenciar produtos

---

## 🚀 Funcionalidades

### 👤 Área do Cliente

* Cadastro de usuário
* Login com autenticação
* Visualização de produtos

### 🔐 Área do Administrador

* Login com permissão especial
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos

---

## 🧠 Tecnologias utilizadas

### 🔙 Backend

* Node.js
* Express
* Sequelize
* MySQL
* JSON Web Token (JWT)

### 🎨 Frontend

* HTML
* CSS
* JavaScript (Vanilla)

---

## 🔒 Autenticação e Segurança

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)**.

### Implementações:

* Proteção de rotas
* Middleware de validação de token
* Controle de permissões por tipo de usuário (admin / cliente)

---

## 📁 Estrutura do projeto

```
backend/
 ├── config/        # Configuração do banco
 ├── controllers/   # Regras de negócio
 ├── models/        # Modelos do Sequelize
 ├── routes/        # Rotas da aplicação
 ├── middlewares/   # Autenticação e permissões

frontend/
 ├── css/           # Estilos
 ├── js/            # Scripts
 ├── pages/         # Telas do sistema
```

---

## ⚙️ Como executar o projeto

### 1️⃣ Clone o repositório

```
git clone https://github.com/seu-usuario/seu-repositorio
```

### 2️⃣ Acesse a pasta

```
cd seu-repositorio
```

### 3️⃣ Instale as dependências

```
npm install
```

### 4️⃣ Configure o arquivo `.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=comercio
PORT=3000
JWT_SECRET=sua_chave_secreta
```

### 5️⃣ Execute o servidor

```
npm run dev
```

---

## 🗄️ Banco de Dados

### Exemplo da tabela `Users`

```
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  senha VARCHAR(255),
  telefone VARCHAR(20),
  role ENUM('cliente','admin')
);
```

---

## 🔮 Melhorias futuras

* 🛍️ Carrinho de compras
* 💳 Integração com pagamentos
* 🖼️ Upload de imagens de produtos
* 📦 Controle de pedidos
* ☁️ Deploy em produção

---

## 📸 Demonstração

*(Adicione aqui prints do sistema futuramente)*

---

## 👨‍💻 Autor

Desenvolvido por **Seu Nome**

---

## 📄 Licença

Este projeto está sob a licença MIT.

/* ARQUITETURA DO BACKEND (SIMULAÇÃO)
  ---------------------------------------------------
  Este projeto utiliza uma arquitetura Serverless no Frontend (LocalStorage).
  Se fosse migrado para uma API Real Node.js, esta seria a estrutura:
*/

const express = require('express');
const app = express();

// 1. Rotas da API que espelham nosso storage.js
// GET /api/books
// POST /api/books
// GET /api/authors
// POST /api/authors
// POST /api/login

// 2. Estrutura de Dados (Schema SQL)
/*
  Table: Users
    - id (PK)
    - username
    - password
    - role (admin/user)

  Table: Books
    - id (PK)
    - title
    - author_id (FK)
    - category_id (FK)
    - quantity
    - price

  Table: Movements
    - id (PK)
    - book_id (FK)
    - type (IN/OUT)
    - date
*/

app.listen(3001, () => {
  console.log('Servidor API rodando na porta 3001');
});
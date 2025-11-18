# Backend Simulado

Este projeto utiliza uma arquitetura **Serverless** (sem servidor dedicado) para fins de demonstração acadêmica.

## Estrutura
A persistência de dados é realizada através do **LocalStorage** do navegador, simulando um banco de dados NoSQL.

## Localização da Lógica
Toda a regra de negócio e manipulação de dados (CRUD) está centralizada no arquivo:
`../frontend/src/utils/storage.js`

## Futuro
Para escalar este projeto, esta pasta `backend` receberia uma API Node.js/Express conectada a um banco SQL, substituindo as chamadas do `storage.js`.
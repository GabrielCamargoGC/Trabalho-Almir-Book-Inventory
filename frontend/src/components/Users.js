// src/components/Users.js
import React from 'react';
export default function Users() {
  return (
    <div className="card">
      <h2>Gerenciar Usuários</h2>
      <p>Funcionalidade restrita a administradores.</p>
      <ul>
        <li>Admin (admin/password)</li>
        <li>Usuário Comum (user/123)</li>
      </ul>
    </div>
  )
}
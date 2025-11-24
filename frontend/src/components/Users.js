import React, { useState, useEffect } from 'react';
// Não precisamos importar do storage pois estamos usando DUMMY_USERS para simplificar.
// Mas se fosse real, o import seria: import { getUsers, saveUsers } from '../../backend/storage';

// ⚠️ Usuários Fixos (DUMMY_USERS)
// Em um sistema real, essa lista viria do banco de dados (API).
const DUMMY_USERS = [
    { id: 1, username: 'admin', password: 'password', role: 'admin', email: 'admin@book.com' },
    { id: 2, username: 'user', password: '123', role: 'user', email: 'user@book.com' }
];

export default function Users() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [form, setForm] = useState({ id: null, username: '', password: '', role: 'user', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  // Na vida real, o useEffect faria: setUsers(getUsers());

  function validate(u) {
    if (!u.username || !u.password || !u.email) return 'Todos os campos são obrigatórios.';
    if (u.password.length < 3) return 'A senha deve ter pelo menos 3 caracteres.';
    return null;
  }

  function handleSave(e) {
    e.preventDefault();
    const validationError = validate(form);
    if (validationError) return alert(validationError);

    const all = [...users];
    if (isEditing) {
      // Atualizar existente
      const idx = all.findIndex(u => u.id === form.id);
      all[idx] = form;
    } else {
      // Criar novo
      const newUser = { ...form, id: Date.now() };
      all.push(newUser);
    }
    
    setUsers(all);
    setForm({ id: null, username: '', password: '', role: 'user', email: '' });
    setIsEditing(false);
    // Em um sistema real: saveUsers(all)
  }

  function handleEdit(user) {
    setForm(user);
    setIsEditing(true);
  }

  function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const filtered = users.filter(u => u.id !== id);
      setUsers(filtered);
      // Em um sistema real: saveUsers(filtered)
    }
  }

  return (
    <div>
      <h2>Gerenciar Usuários (CRUD 4)</h2>
      
      {/* Formulário de Cadastro/Edição */}
      <div className="card">
        <h3>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</h3>
        <form className="form-inline" onSubmit={handleSave}>
          <input 
            placeholder="Username" 
            value={form.username} 
            onChange={e => setForm({...form, username: e.target.value})} 
          />
          <input 
            type="email"
            placeholder="Email" 
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})} 
          />
          <input 
            type="password"
            placeholder="Senha" 
            value={form.password} 
            onChange={e => setForm({...form, password: e.target.value})} 
          />
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
            <option value="admin">Admin</option>
            <option value="user">Usuário Comum</option>
          </select>
          <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
          {isEditing && <button type="button" onClick={() => {setIsEditing(false); setForm({id:null, username:'', password:'', role:'user', email:''})}}>Cancelar</button>}
        </form>
      </div>

      {/* Lista de Usuários */}
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
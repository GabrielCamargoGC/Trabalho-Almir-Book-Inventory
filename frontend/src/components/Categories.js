import React, { useState, useEffect } from 'react';
import { getCategories, saveCategories } from '../utils/storage';

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', desc: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCats(getCategories());
  }, []);

  function handleSave(e) {
    e.preventDefault();
    if (!form.name) return alert('Nome é obrigatório');

    const all = getCategories();
    if (isEditing) {
      const idx = all.findIndex(c => c.id === form.id);
      all[idx] = form;
    } else {
      all.push({ ...form, id: Date.now() });
    }
    
    saveCategories(all);
    setCats(all);
    setForm({ id: null, name: '', desc: '' });
    setIsEditing(false);
  }

  function handleEdit(cat) {
    setForm(cat);
    setIsEditing(true);
  }

  function handleDelete(id) {
    if (window.confirm('Excluir categoria?')) {
      const filtered = cats.filter(c => c.id !== id);
      saveCategories(filtered);
      setCats(filtered);
    }
  }

  return (
    <div>
      <h2>Categorias</h2>
      <div className="card">
        <form className="form-inline" onSubmit={handleSave}>
          <input 
            placeholder="Nome da Categoria" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
          <input 
            placeholder="Descrição" 
            value={form.desc} 
            onChange={e => setForm({...form, desc: e.target.value})} 
          />
          <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
          {isEditing && <button type="button" onClick={() => {setIsEditing(false); setForm({id:null, name:'', desc:''})}}>Cancelar</button>}
        </form>

        <table className="table">
          <thead>
            <tr><th>Nome</th><th>Descrição</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {cats.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.desc}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Editar</button>
                  <button onClick={() => handleDelete(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
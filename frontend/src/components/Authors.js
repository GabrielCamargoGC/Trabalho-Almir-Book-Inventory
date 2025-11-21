import React, { useState, useEffect } from 'react';
import { getAuthors, saveAuthors } from '../utils/storage';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', nationality: '' });
  const [isEditing, setIsEditing] = useState(false);

  //Carregar dados ao abrir
  useEffect(() => {
    setAuthors(getAuthors());
  }, []);

  function handleSave(e) {
    e.preventDefault();
    if (!form.name || !form.nationality) return alert('Preencha todos os campos');

    const all = getAuthors();
    if (isEditing) {
      //Atualizar existente
      const idx = all.findIndex(a => a.id === form.id);
      all[idx] = form;
    } else {
      //Criar novo
      const newAuthor = { ...form, id: Date.now() };
      all.push(newAuthor);
    }
    
    saveAuthors(all);
    setAuthors(all);
    setForm({ id: null, name: '', nationality: '' });
    setIsEditing(false);
  }

  function handleEdit(author) {
    setForm(author);
    setIsEditing(true);
  }

  function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const filtered = authors.filter(a => a.id !== id);
      saveAuthors(filtered);
      setAuthors(filtered);
    }
  }

  return (
    <div>
      <h2>Autores</h2>
      <div className="card">
        <form className="form-inline" onSubmit={handleSave}>
          <input 
            placeholder="Nome" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
          <input 
            placeholder="Nacionalidade" 
            value={form.nationality} 
            onChange={e => setForm({...form, nationality: e.target.value})} 
          />
          <button type="submit">{isEditing ? 'Atualizar' : 'Salvar'}</button>
          {isEditing && <button type="button" onClick={() => {setIsEditing(false); setForm({id:null, name:'', nationality:''})}}>Cancelar</button>}
        </form>

        <table className="table">
          <thead>
            <tr><th>Nome</th><th>Nacionalidade</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {authors.map(a => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.nationality}</td>
                <td>
                  <button onClick={() => handleEdit(a)}>Editar</button>
                  <button onClick={() => handleDelete(a.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
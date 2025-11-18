import React, {useState, useEffect} from 'react';
import { getBooks, saveBooks, getMovements, saveMovements } from '../utils/storage';

const empty = {id:null, title:'', author:'', genre:'', price:'', quantity:''};

export default function Books(){
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{ setBooks(getBooks()); }, []);

  function validate(b){
    if(!b.title) return 'Título obrigatório';
    if(!b.author) return 'Autor obrigatório';
    if(!b.genre) return 'Gênero obrigatório';
    if(b.price==='' || isNaN(Number(b.price))) return 'Preço inválido';
    if(b.quantity==='' || isNaN(Number(b.quantity))) return 'Quantidade inválida';
    return null;
  }

  function onSave(e){
    e.preventDefault();
    const v = validate(form);
    if(v){ setError(v); return; }
    const all = getBooks();
    if(editing){
      const idx = all.findIndex(x=>x.id===form.id);
      all[idx] = {...form, price:Number(form.price), quantity:Number(form.quantity)};
    } else {
      const id = Date.now();
      all.push({...form, id, price:Number(form.price), quantity:Number(form.quantity)});
    }
    saveBooks(all);
    setBooks(all);
    setForm(empty);
    setEditing(false);
    setError('');
  }

  function onEdit(b){
    setForm({...b});
    setEditing(true);
    setError('');
  }

  function onDelete(id){
    if(!confirm('Deletar este livro?')) return;
    const all = getBooks().filter(x=>x.id!==id);
    saveBooks(all);
    setBooks(all);
  }

  function registerMovement(bookId, change, type){
    const moves = getMovements();
    const m = {id:Date.now(), bookId, change, type, date: new Date().toISOString()};
    moves.push(m);
    saveMovements(moves);
    // update book quantity
    const all = getBooks();
    const idx = all.findIndex(b=>b.id===bookId);
    if(idx>=0){ all[idx].quantity = Number(all[idx].quantity) + Number(change); saveBooks(all); setBooks(all); }
  }

  const displayed = books.filter(b=> b.title.toLowerCase().includes(filter.toLowerCase()) || b.author.toLowerCase().includes(filter.toLowerCase()));

  const totalQty = books.reduce((s,b)=>s + Number(b.quantity), 0);
  const totalValue = books.reduce((s,b)=> s + (Number(b.quantity)*Number(b.price||0)), 0);

  return (
    <div>
      <h2>Livros</h2>
      <div className='card'>
        <form className='form-inline' onSubmit={onSave}>
          <input placeholder='Título' value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input placeholder='Autor' value={form.author} onChange={e=>setForm({...form, author:e.target.value})} />
          <input placeholder='Gênero' value={form.genre} onChange={e=>setForm({...form, genre:e.target.value})} />
          <input placeholder='Preço' value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input placeholder='Qtd' value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
          <button type='submit'>{editing ? 'Atualizar' : 'Adicionar'}</button>
        </form>
        {error && <div className='error'>{error}</div>}
      </div>

      <div className='card'>
        <div className='toolbar'>
          <input placeholder='Filtrar por título/autor' value={filter} onChange={e=>setFilter(e.target.value)} />
          <div className='totals'>Total Qtd: <strong>{totalQty}</strong>  Valor Estoque: <strong>R$ {totalValue.toFixed(2)}</strong></div>
        </div>
        <table className='table'>
          <thead><tr><th>Título</th><th>Autor</th><th>Gênero</th><th>Preço</th><th>Qtd</th><th>Ações</th></tr></thead>
          <tbody>
            {displayed.map(b=>(
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>R$ {Number(b.price).toFixed(2)}</td>
                <td>{b.quantity}</td>
                <td className='actions'>
                  <button onClick={()=>onEdit(b)}>Editar</button>
                  <button onClick={()=>onDelete(b.id)}>Excluir</button>
                  <button onClick={()=>{ const q = prompt('Entrar(+)/Sair(-): informe número (use - para saída)'); if(q) registerMovement(b.id, Number(q), q>0 ? 'IN' : 'OUT'); }}>Movimentar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

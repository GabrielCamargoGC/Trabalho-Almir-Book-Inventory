import React, {useState, useEffect} from 'react';
import { getMovements, getBooks, saveMovements } from '../utils/storage';

export default function Movements(){
  const [moves, setMoves] = useState([]);
  const [booksMap, setBooksMap] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(()=>{ load(); }, []);

  function load(){
    const m = getMovements().sort((a,b)=> new Date(b.date)-new Date(a.date));
    setMoves(m);
    const map = {};
    getBooks().forEach(b=> map[b.id]=b);
    setBooksMap(map);
  }

  function onDelete(id){
    if(!confirm('Deletar movimentação?')) return;
    const m = getMovements().filter(x=>x.id!==id);
    saveMovements(m);
    setMoves(m);
  }

  const displayed = moves.filter(m => {
    const title = (booksMap[m.bookId] && booksMap[m.bookId].title) || '';
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <h2>Movimentações</h2>
      <div className='card'>
        <div className='toolbar'>
          <input placeholder='Filtrar por livro' value={filter} onChange={e=>setFilter(e.target.value)} />
        </div>
        <table className='table'>
          <thead><tr><th>Livro</th><th>Tipo</th><th>Quantidade</th><th>Data</th><th>Ações</th></tr></thead>
          <tbody>
            {displayed.map(m=> (
              <tr key={m.id}>
                <td>{(booksMap[m.bookId] && booksMap[m.bookId].title) || '—'}</td>
                <td>{m.type}</td>
                <td>{m.change}</td>
                <td>{new Date(m.date).toLocaleString()}</td>
                <td><button onClick={()=>onDelete(m.id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, {useState} from 'react';
import { logout } from '../utils/storage';
import Books from './Books';
import Movements from './Movements';
import Reports from './Reports';

export default function Dashboard({onLogout}) {
  const [view, setView] = useState('books');

  function doLogout() {
    logout();
    onLogout();
  }

  return (
    <div className='dashboard'>
      <aside className='menu'>
        <h1>Book Inventory</h1>
        <nav>
          <button onClick={()=>setView('books')}>Livros</button>
          <button onClick={()=>setView('movements')}>Movimentações</button>
          <button onClick={()=>setView('reports')}>Relatórios</button>
        </nav>
        <div className='menu-bottom'>
          <button className='danger' onClick={doLogout}>Logout</button>
        </div>
      </aside>
      <main className='content'>
        {view==='books' && <Books />}
        {view==='movements' && <Movements />}
        {view==='reports' && <Reports />}
      </main>
    </div>
  );
}

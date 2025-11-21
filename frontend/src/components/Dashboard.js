import React, {useState} from 'react';
import { logout, getCurrentUser } from '../utils/storage';
import Books from './Books';
import Movements from './Movements';
import Reports from './Reports';
import Authors from './Authors';
import Categories from './Categories';
import Users from './Users'; 

export default function Dashboard({onLogout}) {
  const [view, setView] = useState('books');
  
  //saber se é admin
  const user = getCurrentUser();

  function doLogout() {
    logout();
    onLogout();
  }

  return (
    <div className='dashboard'>
      <aside className='menu'>
        <h1>Book Inventory</h1>
        <nav>
          <button onClick={()=>setView('books')} className={view==='books'?'active':''}>Livros</button>
          
          {}
          <button onClick={()=>setView('authors')} className={view==='authors'?'active':''}>Autores</button>
          <button onClick={()=>setView('categories')} className={view==='categories'?'active':''}>Categorias</button>
          
          {}
          {user && user.role === 'admin' && (
             <button onClick={()=>setView('users')} className={view==='users'?'active':''}>Usuários</button>
          )}

          <hr /> {}

          <button onClick={()=>setView('movements')} className={view==='movements'?'active':''}>Movimentações</button>
          <button onClick={()=>setView('reports')} className={view==='reports'?'active':''}>Relatórios</button>
        </nav>
        
        <div className='menu-bottom'>
          <div style={{marginBottom: '10px', fontSize:'0.8rem'}}>
            Logado como: <strong>{user ? user.username : ''}</strong>
          </div>
          <button className='danger' onClick={doLogout}>Logout</button>
        </div>
      </aside>

      <main className='content'>
        {view==='books' && <Books />}
        {view==='authors' && <Authors />}       {/* Renderiza Autores */}
        {view==='categories' && <Categories />} {/* Renderiza Categorias */}
        {view==='users' && <Users />}           {/* Renderiza Usuários */}
        
        {view==='movements' && <Movements />}
        {view==='reports' && <Reports />}
      </main>
    </div>
  );
}
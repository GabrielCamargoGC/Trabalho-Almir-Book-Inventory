import React, {useState, useEffect} from 'react';
import { getBooks, getMovements } from '../utils/storage';

export default function Reports(){
  const [books, setBooks] = useState([]);
  const [moves, setMoves] = useState([]);

  useEffect(()=>{
    setBooks(getBooks());
    setMoves(getMovements());
  },[]);

  const byGenre = books.reduce((acc,b)=>{
    acc[b.genre] = acc[b.genre] || {count:0, qty:0, value:0};
    acc[b.genre].count += 1;
    acc[b.genre].qty += Number(b.quantity);
    acc[b.genre].value += Number(b.quantity)*Number(b.price||0);
    return acc;
  },{});

  const pivotAuthor = books.reduce((acc,b)=>{
    acc[b.author] = acc[b.author] || 0;
    acc[b.author] += 1;
    return acc;
  },{});

  return (
    <div>
      <h2>Relatórios</h2>
      <div className='card'>
        <h3>Agrupamento por Gênero</h3>
        <table className='table small'>
          <thead><tr><th>Gênero</th><th>Nº Livros</th><th>Qtd total</th><th>Valor Estoque</th></tr></thead>
          <tbody>
            {Object.keys(byGenre).map(g=> (
              <tr key={g}>
                <td>{g}</td>
                <td>{byGenre[g].count}</td>
                <td>{byGenre[g].qty}</td>
                <td>R$ {byGenre[g].value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='card'>
        <h3>Pivot - Contagem por Autor</h3>
        <table className='table small'>
          <thead><tr><th>Autor</th><th>Nº Livros</th></tr></thead>
          <tbody>
            {Object.keys(pivotAuthor).map(a=> (
              <tr key={a}><td>{a}</td><td>{pivotAuthor[a]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='card'>
        <h3>Movimentações (Resumo)</h3>
        <div>Total movimentações: {moves.length}</div>
        <div>Entradas: {moves.filter(m=>m.type==='IN').length}</div>
        <div>Saídas: {moves.filter(m=>m.type==='OUT').length}</div>
      </div>
    </div>
  );
}

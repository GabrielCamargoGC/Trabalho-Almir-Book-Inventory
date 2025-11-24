import React, {useState} from 'react';
import { login } from '../utils/storage';

export default function Login({onLogin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if(!username || !password) { setError('Preencha usuário e senha'); return; }
    const u = login(username, password);
    if(u) { onLogin(u); } else { setError('Credenciais inválidas'); }
  }

  return (
    <div className='fundo-login'>
    <div className='login-page'>
      <form className='card form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className='error'>{error}</div>}
        <label>Usuário</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Senha</label>
        <input type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Entrar</button>
        <div className='hint'>Use <strong>admin</strong> / <strong>password</strong></div>
      </form>
    </div>
    </div>
  );
}

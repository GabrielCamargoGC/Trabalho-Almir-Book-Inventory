import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { seedIfEmpty, getCurrentUser } from './utils/storage';

function App() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <div className='app'>
      {user ? <Dashboard onLogout={() => setUser(null)} /> : <Login onLogin={(u) => setUser(u)} />}
    </div>
  );
}

export default App;

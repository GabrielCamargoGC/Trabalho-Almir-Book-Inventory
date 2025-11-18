/*
 Utilities to interact with localStorage
*/
const BOOKS_KEY = 'books';
const AUTHORS_KEY = 'authors';      // NOVO
const CAT_KEY = 'categories';       // JÁ EXISTIA, AGORA VAMOS USAR
const MOVES_KEY = 'movements';
const USER_KEY = 'currentUser';

// Usuários Hardcoded (Simulação)
const USERS = [{ username: 'admin', password: 'password', role: 'admin' }];

export function seedIfEmpty() {
  // 1. Seed Livros
  if (!localStorage.getItem(BOOKS_KEY)) {
    const sample = [
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', price: 30, quantity: 5 },
      { id: 2, title: 'The Pragmatic Programmer', author: 'Andy Hunt', genre: 'Programming', price: 35, quantity: 3 },
      { id: 3, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy', price: 20, quantity: 10 },
    ];
    localStorage.setItem(BOOKS_KEY, JSON.stringify(sample));
  }

  // 2. Seed Autores (NOVO - Para cumprir CRUD 2)
  if (!localStorage.getItem(AUTHORS_KEY)) {
    const authors = [
      { id: 1, name: 'Robert C. Martin', nationality: 'Americano' },
      { id: 2, name: 'Andy Hunt', nationality: 'Americano' },
      { id: 3, name: 'J.K. Rowling', nationality: 'Britânica' }
    ];
    localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors));
  }

  // 3. Seed Categorias (NOVO - Para cumprir CRUD 3)
  if (!localStorage.getItem(CAT_KEY)) {
    const cats = [
      { id: 1, name: 'Programming', desc: 'Livros técnicos de TI' },
      { id: 2, name: 'Fantasy', desc: 'Livros de fantasia e magia' }
    ];
    localStorage.setItem(CAT_KEY, JSON.stringify(cats));
  }

  // 4. Seed Movimentações
  if (!localStorage.getItem(MOVES_KEY)) {
    localStorage.setItem(MOVES_KEY, JSON.stringify([]));
  }
}

// --- LIVROS ---
export function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY) || '[]');
}
export function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

// --- AUTORES (NOVO) ---
export function getAuthors() {
  return JSON.parse(localStorage.getItem(AUTHORS_KEY) || '[]');
}
export function saveAuthors(authors) {
  localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors));
}

// --- CATEGORIAS (NOVO) ---
export function getCategories() {
  return JSON.parse(localStorage.getItem(CAT_KEY) || '[]');
}
export function saveCategories(cats) {
  localStorage.setItem(CAT_KEY, JSON.stringify(cats));
}

// --- MOVIMENTAÇÕES ---
export function getMovements() {
  return JSON.parse(localStorage.getItem(MOVES_KEY) || '[]');
}
export function saveMovements(m) {
  localStorage.setItem(MOVES_KEY, JSON.stringify(m));
}

// --- AUTH ---
export function login(username, password) {
  const found = USERS.find(u => u.username === username && u.password === password);
  if (found) {
    localStorage.setItem(USER_KEY, JSON.stringify({ username: found.username, role: found.role }));
    return { username: found.username, role: found.role };
  }
  return null;
}
export function logout() {
  localStorage.removeItem(USER_KEY);
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
}
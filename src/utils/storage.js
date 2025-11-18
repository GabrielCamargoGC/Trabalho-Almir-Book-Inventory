/*
 Utilities to interact with localStorage
*/
const BOOKS_KEY = 'books';
const MOVES_KEY = 'movements';
const USER_KEY = 'currentUser';
const USERS = [{username:'admin', password:'password', role:'admin'}];

export function seedIfEmpty() {
  if(!localStorage.getItem(BOOKS_KEY)) {
    const sample = [
      {id:1, title:'Clean Code', author:'Robert C. Martin', genre:'Programming', price:30, quantity:5},
      {id:2, title:'The Pragmatic Programmer', author:'Andy Hunt', genre:'Programming', price:35, quantity:3},
      {id:3, title:'Harry Potter', author:'J.K. Rowling', genre:'Fantasy', price:20, quantity:10},
    ];
    localStorage.setItem(BOOKS_KEY, JSON.stringify(sample));
  }
  if(!localStorage.getItem(MOVES_KEY)) {
    localStorage.setItem(MOVES_KEY, JSON.stringify([]));
  }
}

export function getBooks() {
  return JSON.parse(localStorage.getItem(BOOKS_KEY) || '[]');
}
export function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}
export function getMovements() {
  return JSON.parse(localStorage.getItem(MOVES_KEY) || '[]');
}
export function saveMovements(m) {
  localStorage.setItem(MOVES_KEY, JSON.stringify(m));
}

export function login(username, password) {
  const found = USERS.find(u => u.username===username && u.password===password);
  if(found) {
    localStorage.setItem(USER_KEY, JSON.stringify({username: found.username, role: found.role}));
    return {username: found.username, role: found.role};
  }
  return null;
}
export function logout() {
  localStorage.removeItem(USER_KEY);
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
}

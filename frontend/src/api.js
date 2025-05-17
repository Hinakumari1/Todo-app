import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000/api', // <-- replace with your backend address
});

export const fetchTodos = () => API.get('/todo');
export const createTodo = (data) => API.post('/todo', data);
export const updateTodo = (id, data) => API.put(`/todo/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);

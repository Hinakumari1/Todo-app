import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = '/api/todo'; // adjust if needed

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_BASE);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return alert('Please enter a task');
    try {
      await axios.post(API_BASE, { task });
      setTask('');
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTask(todo.task);
  };

  const updateTodo = async () => {
    if (!editingTask.trim()) return alert('Please enter a task');
    try {
      await axios.put(`${API_BASE}/${editingId}`, { task: editingTask });
      setEditingId(null);
      setEditingTask('');
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTask('');
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: 10 }}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                />
                <button onClick={updateTodo}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.task}</span>
                <button onClick={() => startEdit(todo)} style={{ marginLeft: 10 }}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 5 }}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

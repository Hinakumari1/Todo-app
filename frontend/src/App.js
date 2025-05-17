import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTodos().then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await createTodo({ title: newTodo, completed: false });
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const toggleTodo = async (todo) => {
    const res = await updateTodo(todo._id, { ...todo, completed: !todo.completed });
    setTodos(todos.map(t => t._id === todo._id ? res.data : t));
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t._id !== id));
  };

  const handleUpdateClick = (todo) => {
    setEditTodoId(todo._id);
    setEditTitle(todo.title);
  };

  const submitUpdate = async () => {
    if (!editTitle.trim()) return;
    const res = await updateTodo(editTodoId, { title: editTitle });
    setTodos(todos.map(t => t._id === editTodoId ? res.data : t));
    setEditTodoId(null);
    setEditTitle('');
  };

  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '20px', color: '#333' }}>ToDo App</h1>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Enter task"
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '250px',
            outline: 'none',
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '400px' }}>
        {todos.map(todo => (
          <li
            key={todo._id}
            style={{
              backgroundColor: 'white',
              padding: '10px 15px',
              marginBottom: '10px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {editTodoId === todo._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  style={{
                    flexGrow: 1,
                    marginRight: '10px',
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={submitUpdate}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: '#28a745',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginRight: '8px',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTodoId(null)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : '',
                    cursor: 'pointer',
                    flexGrow: 1,
                    color: todo.completed ? '#6c757d' : '#212529',
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleUpdateClick(todo)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    marginLeft: '8px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'black',
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => removeTodo(todo._id)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '14px',
                    marginLeft: '8px',
                    backgroundColor: '#dc3545',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
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

export default App;

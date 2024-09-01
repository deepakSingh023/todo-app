import React, { useState, useEffect } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(response => {
        setTodos(response.data);
      })
      .catch(err => console.log(err));
  }, [todos]);

  const taskHandler = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        // Update state to reflect changes without reloading
        setTodos(todos.map(todo => (todo._id === id ? { ...todo, done: !todo.done } : todo)));
      })
      .catch(err => console.log(err));
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        // Update state to remove deleted task without reloading
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h1>ToDo App</h1>
      <Create />
      {
        todos.length === 0
          ? <div><h1>No todos</h1></div>
          : todos.map(todo => (
              <div className="task" key={todo._id}>
                <div className='checkBox' onClick={() => taskHandler(todo._id)}>
                  {todo.done
                    ? <BsCircleFill className='icon done' />
                    : <BsCircleFill className='icon' />}
                  <div>
                    <p className={todo.done ? "line" : ""}>{todo.task}</p>
                  </div>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={() => deleteHandler(todo._id)} /></span>
                </div>
              </div>
            ))
      }
    </div>
  );
}

export default Home;

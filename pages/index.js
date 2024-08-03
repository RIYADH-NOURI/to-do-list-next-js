import { useState, useEffect } from "react";
import styles from "/styles/Home.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a task");
    } else {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const updateTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className={styles.todoContainer}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        className={styles.input}
      />
      <button onClick={addTodo} className={styles.button}>
        Add
      </button>
      <div className={styles.container_list}>
        <ul className={styles.list}>
          {todos.map((todo, index) => (
            <li key={index} className={styles.listItem}>
              <input
                type="text"
                value={todo.text}
                onChange={(e) => updateTodo(index, e.target.value)}
                className={styles.input}
              />
              <button
                onClick={() => deleteTodo(index)}
                className={styles.button}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={deleteAllTodos} className={styles.button}>
        Delete All
      </button>
    </div>
  );
};

export default TodoList;

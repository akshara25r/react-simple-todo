import React from "react";
import "./App.css";
import { useReducer } from "react";

function App() {
  const initialTodo = {
    inputValue: "",
    tasks: [],
  };
  
  const todoReducer = (state, action) => {
    switch (action.type) {
      case "SET_INPUT":
        return { ...state, inputValue: action.value };
      case "ADD_TASK":
        return {
          ...state,
          tasks: [
            ...state.tasks,
            { id: Date.now(), text: state.inputValue, hidden: false },
          ],
          inputValue: "",
        };
      case "UPDATE_TASK":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.id ? { ...task, text: action.text } : task
          ),
        };
      case "DELETE_TASK":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.id),
          
        };
      default:
        return state;
    }
  };
  const [todo, dispatch] = useReducer(todoReducer, initialTodo);
  const handleInput = (event) => {
    dispatch({ type: "SET_INPUT", value: event.target.value });
  };

  const handleClick = () => {
    dispatch({ type: "ADD_TASK" });
  };

  const handleUpdate = (id, value) => {
    dispatch({ type: "UPDATE_TASK", id, text: value });
  };
  
const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    dispatch({ type: "DELETE_TASK", id });
  
  }
};

  return (
    <div className="page">
      <div className="todo-page">
         <h1 className="todo-heading">📝 My To-Do List</h1>
        <div>
          <input
            className="inputText"
            type="text"
            placeholder="Let's do"
            value={todo.inputValue}
            onChange={handleInput}
          />
          <button className="addItem" onClick={handleClick}>
            Add Item
          </button>
        </div>
        <div className="text">{todo.inputValue}</div>
        <div>
          {todo.tasks.map((task) => (
            <div className="todoTask" key={task.id}>
              <input
                className="inputText"
                type="text"
                value={task.text}
                onChange={(e) => handleUpdate(task.id, e.target.value)}
              />
              <button
                className="deleteItem"
                onClick={() => handleDelete(task.id)}
              >
                Delete Item{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

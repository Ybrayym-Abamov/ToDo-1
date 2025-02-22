import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList,
    value: ""
  };
  // event handlers = inside we are using this.setState
  handleDelete = (event, todoIdToDelete) => {
    // identify what we want to change in state
    // create a copy of state and modify it
    const newTodoList = this.state.todos.filter(
      todo => todo.id !== todoIdToDelete  // generate true/false
    );
    // overwrite the old state with new state
    this.setState({ todos: newTodoList });
  };

  handleCreate = (event) => {
    // implement me!
    // event.key
    if (event.key === "Enter") {
      // add the todo
      // this.state.value
      const newTodoList = this.state.todos.slice();
      newTodoList.push({
        userId: 1,
        id: Math.floor(Math.random() * 100000000),
        title: this.state.value,
        completed: false
      })
      this.setState({ todos: newTodoList, value: "" })
    }
  }

  handleToggle = todoIdToToggle => {
    // immubility pattern

    // modify the copy
    // map
    // 1. create a new array
    // 2. can specify how you want to modify each item
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        // modify this todo
        // toggle its completed value 
        // create a copy of the todo to modify
        const newTodo = { ...todo }
        // modify the copy 
        newTodo.completed = !newTodo.completed;
        // voerwrite the original with the copy
        return newTodo;
      }
      // return the todo
      return todo;
    });
    // overwrite the old state with new state
    this.setState({ todos: newTodoList });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  };

  handleClear = (event) => {
    const newTodoList = this.state.todos.filter(
      todo => todo.completed === false
    );
    this.setState({ todos: newTodoList });
  };


  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.handleCreate}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </header>
        <TodoList handleClear={this.handleClear} handleToggle={this.handleToggle} handleDelete={this.handleDelete} todos={this.state.todos} />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button onClick={this.handleClear} className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  // this.props.handleDelete
  // this.props.handleToggle
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.handleToggle}
          />
          <label>{this.props.title}</label>
          <button className="destroy"
            onClick={this.props.handleDelete}
          />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  // this.props.handleDelete
  // this.props.handleToggle
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              handleToggle={event => this.props.handleToggle(todo.id)}
              handleDelete={event => this.props.handleDelete(event, todo.id)}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;

import React from "react";
//import logo from './logo.svg';
import "./App.css";
//import {getUsers, getUser, getTodos, getTodo, getUserTodos } from './api.js';
import UserList from "./userlist";
import TodoList from "./todolist";
import ViewUser from "./viewUser";
import UserTodo from "./userTodo";
import ViewTodo from "./viewTodo";

class App extends React.Component {
  state = {
    view: null,
    userId: 0,
    userName: "",
    todoId: 0
  };

  setUserId = id => this.setState({ userId: id });
  setUserName = name => this.setState({ userName: name });
  setTodoId = id => this.setState({ todoId: id });

  loadUser = id => {
    this.setUserId(id);
    this.setState({ view: "User" });
  };

  loadTodo = id => {
    this.setTodoId(id);
    this.setState({ view: "Todo" });
  };

  loadUserTodo = id => {
    this.setUserId(id);
    this.setState({ view: "UserTodo" });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos App</h1>

          <button
            onClick={() => {
              this.setState({ view: "UserList" });
            }}
          >
            List Users
          </button>
          <button
            onClick={() => {
              this.setState({ view: "TodoList" });
            }}
          >
            List Todos
          </button>
        </header>
        <section className="main">
          {this.state.view === "UserList" ? (
            <UserList
              loadUser={this.loadUser}
              loadUserTodo={this.loadUserTodo}
            />
          ) : this.state.view === "TodoList" ? (
            <TodoList
              loadTodo={this.loadTodo}
              loadUser={this.loadUser}
              loadUserTodo={this.loadUserTodo}
            />
          ) : this.state.view === "UserTodo" ? (
            <UserTodo userId={this.state.userId} loadTodo={this.loadTodo} />
          ) : this.state.view === "User" ? (
            <ul className="todo-list">
              <ViewUser
                setFilter={this.setFilter}
                filter={this.state.filter}
                userId={this.state.userId}
                loadUserTodo={this.loadUserTodo}
              />
            </ul>
          ) : this.state.view === "Todo" ? (
            <ul className="todo-list">
              <ViewTodo loadUser={this.loadUser} todoId={this.state.todoId} />
            </ul>
          ) : (
            <div />
          )}
        </section>
      </section>
    );
  }
}

export default App;

import React from "react";
import { getUserTodos } from "./api.js";
import Filters from "./filters";

class UserTodo extends React.Component {
  state = {
    todos: null,
    filter: "",
    filters: ["completed", "title"]
  };

  async componentDidMount() {
    const todos = await getUserTodos(this.props.userId);

    this.setState({ todos: todos });
  }

  setFilter = newFilter => {
    this.state.filter === newFilter
      ? this.setState(prevstate => {
          todos: prevstate.todos.reverse();
        })
      : this.setState(prevstate => {
          todos: prevstate.todos.sort((a, b) => {
            a = String(a[newFilter]);
            b = String(b[newFilter]);
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
          });
        });
    this.setState({ filter: newFilter });
  };

  list = () =>
    this.state.todos.map(todo => (
      <li>
        <input type="checkbox" checked={todo.completed} className="toggle" />
        <label>{todo.title}</label>
        <div>
          <button
            className="loadTodo"
            onClick={() => {
              this.props.loadTodo(todo.id);
            }}
          >
            Load Todo
          </button>
        </div>
      </li>
    ));

  render() {
    const todos = this.state.todos;
    return (
      <div>
        <ul className="filters">
          <Filters
            setFilter={this.setFilter}
            filters={this.state.filters}
            filter={this.state.filter}
          />
        </ul>
        <ul className="todo-list">
          {todos ? this.list(todos) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default UserTodo;

import React from "react";
import { getFullTodos } from "./api.js";
import Filters from "./filters";

class TodoList extends React.Component {
  state = {
    todos: null,
    filter: "",
    filters: ["completed", "username", "title"]
  };

  async componentDidMount() {
    const todos = await getFullTodos();
    this.setState({
      todos: todos
    });
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

  list = todos =>
    todos.map(todo => (
      <li>
        <input type="checkbox" checked={todo.completed} className="toggle" />
        <label>
          <a
            href="#"
            onClick={() => {
              this.props.loadUser(todo.userId);
            }}
          >
            {todo.username}
          </a>
          {todo.title}
        </label>
        <div className="but">
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

export default TodoList;

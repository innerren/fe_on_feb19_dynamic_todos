import React from "react";
import { getFullTodos, getUserTodos } from "./api.js";
import Filters from "./Filters";

class TodoList extends React.Component {
  state = {
    todos: null,
    filter: "",
    reversed: false,
  };

  async componentDidMount() {
    const todos = (this.props.userId === "") ? await getFullTodos() : await getUserTodos(this.props.userId);
    this.setState({todos});
  }

  setFilter = newFilter => {
    this.state.filter === newFilter
      ? this.setState(prevstate => {
        return {todos: prevstate.todos.reverse(),
                reverse: !prevstate.reverse
              }})
      : this.setState(prevstate => {
          return {filter: newFilter,
                    todos: prevstate.todos.sort((a, b) => {
                      a = String(a[newFilter]);
                      b = String(b[newFilter]);
                      if (a < b) {
                        return -1;
                      }
                      if (a > b) {
                        return 1;
                      }
                    })}
        });
  };

  list = todos =>
    todos.map(todo => (
      <li key={todo.id}>
        <input type="checkbox" defaultChecked={todo.completed} className="toggle" />
        <label>
          <div className="link"
            onClick={() => {
              this.props.setUserViewer(todo.userId, "User");
            }}
          >
            {todo.username}
          </div>
          {todo.title}
        </label>
        <div className="but">
          <button
            className="loadTodo"
            onClick={() => {
              this.props.setTodoViewer(todo.id, "Todo");
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
          <Filters
            setFilter={this.setFilter}
            filters={this.props.filters}
            filter={this.state.filter}
          />
        <ul className="todo-list">
          {todos ? this.list(todos) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default TodoList;

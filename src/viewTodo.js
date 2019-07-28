import React from "react";
import { getTodo } from "./api.js";

class ViewTodo extends React.Component {
  state = {
    todo: null
  };

  async componentDidMount() {
    const todo = await getTodo(this.props.todoId);

    this.setState({ todo: todo });
  }

  list = todo =>
    Object.keys(todo).map(key => (
      <li key={key}>
        <div>{key}:</div>
        <div>{todo[key]}</div>
      </li>
    ));

  render() {
    const todo = this.state.todo;
    return <div>{todo ? this.list(todo) : <h2> Loading... </h2>}</div>;
  }
}

export default ViewTodo;

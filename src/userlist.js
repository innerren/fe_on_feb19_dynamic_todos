import React from "react";
import { getUsers } from "./api.js";
import Filters from "./filters";

class UserList extends React.Component {
  state = {
    users: null,
    filter: "",
    filters: ["id", "username"]
  };

  async componentDidMount() {
    const users = await getUsers();

    this.setState({ users: users });
  }

  setFilter = newFilter => {
    this.state.filter === newFilter
      ? this.setState(prevstate => {
          users: prevstate.users.reverse();
        })
      : this.setState(prevstate => {
          users: prevstate.users.sort((a, b) => {
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

  list = users =>
    users.map(user => (
      <li className="" id={user.id}>
        <a
          href="#"
          onClick={() => {
            this.props.loadUser(user.id);
          }}
          className="user"
        >
          {user.username}
        </a>
        <div>
          <button
            className="loadTodo"
            onClick={() => {
              this.props.loadUserTodo(user.id);
            }}
          >
            Load User Todo
          </button>
        </div>
      </li>
    ));

  render() {
    const users = this.state.users;
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
          {users ? this.list(users) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default UserList;

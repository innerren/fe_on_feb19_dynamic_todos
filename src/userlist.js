import React from "react";
import { getUsers } from "./api.js";
import Filters from "./Filters";

class UserList extends React.Component {
  state = {
    users: null,
    filter: "",
    reversed: false,
  };

  async componentDidMount() {
    const users = await getUsers();

    this.setState({ users: users });
  }

  setFilter = newFilter => {
    this.state.filter === newFilter
      ? this.setState(prevstate => {
          return {users: prevstate.users.reverse(),
                  reversed: !prevstate.reversed
                }})
      : this.setState(prevstate => {
          return {filter: newFilter,
                    users: prevstate.users.sort((a, b) => {
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

  list = users =>
    users.map(user => (
      <li className="" key={user.id}>
        <div className="link"
          onClick={() => {
            this.props.setUserViewer(user.id, "User");
          }}
        >
          {user.username}
        </div>
        <div>
          <button
            className="loadTodo"
            onClick={() => {
              this.props.setUserViewer(user.id, "UserTodo");
            }}
          >
            Load User Todo
          </button>
        </div>
      </li>
    ));

  render() {
    const {users, reversed} = this.state;
    return (
      <div>
          <Filters
            setFilter={this.setFilter}
            filters={this.props.filters}
            filter={this.state.filter}
          />
        <ul className="todo-list" key={reversed}>
          {users ? this.list(users) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default UserList;

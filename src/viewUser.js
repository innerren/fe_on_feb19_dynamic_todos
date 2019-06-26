import React from "react";
import { getUser } from "./api.js";

class ViewUser extends React.Component {
  state = {
    user: null
  };

  subData = dataList => {
    return Object.keys(dataList).map(key => (
      <li>
        <div>{key}:</div>
        {typeof dataList[key] === "object" ? (
          <ul>{this.subData(dataList[key])}</ul>
        ) : (
          <div>{dataList[key]}</div>
        )}
      </li>
    ));
  };

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user: user });
  }

  render() {
    {
      console.log(`view User: ${this.props.userId}`);
    }
    const user = this.state.user;
    return (
      <ul className="todo-list">
        {user ? this.subData(user) : <h2> Loading... </h2>}
      </ul>
    );
  }
}

export default ViewUser;

import React from "react";
//import logo from './logo.svg';
import "./App.css";
//import {getUsers, getUser, getTodos, getTodo, getUserTodos } from './api.js';
import UserList from "./UserList";
import TodoList from "./TodoList";
import ViewUser from "./ViewUser";
import ViewTodo from "./ViewTodo";

class App extends React.Component {
  state = {
    view: null,
    userId: 0,
    userName: "",
    todoId: 0
  };

  setUserViewer = (userId, view) => this.setState({userId, view});

  setTodoViewer=  (todoId, view) => this.setState({todoId, view});

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

          <Viewer 
          key={this.state.view}
          view={this.state.view}
          setUserViewer={this.setUserViewer}
          setTodoViewer={this.setTodoViewer}
          userId={this.state.userId}
          todoId={this.state.todoId}
          />
  
        </section>
      </section>
    );
  }
}

 const Viewer = (props) => {
         switch(props.view){
          case "UserList": return (<UserList
              setUserViewer={props.setUserViewer}
              filters = {["id", "username"]}
            />)
          case "TodoList": return (<TodoList
              setTodoViewer={props.setTodoViewer}
              setUserViewer={props.setUserViewer}
              userId={""}
              filters={["completed", "username", "title"]}
            />)
          case "UserTodo": return  (
            <TodoList 
              userId={props.userId} 
              setTodoViewer={props.setTodoViewer}
              setTodoViewer={props.setTodoViewer} 
              filters={["completed", "title"]}
            />)
          case "User": return (<ul className="todo-list">
              <ViewUser
                userId={props.userId}
              />
            </ul>)
          case "Todo": return (<ul className="todo-list">
              <ViewTodo 
              todoId={props.todoId} />
            </ul>)
          default: return (<div />)
        }
      }

export default App;

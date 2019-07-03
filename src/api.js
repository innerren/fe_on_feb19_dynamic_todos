const BASE_URL = " https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  return fetch(`${BASE_URL}/users`).then(response => response.json());
};

export const getUser = async userId => {
  return fetch(`${BASE_URL}/users/${userId}`).then(response => response.json());
};

export const getTodos = async () => {
  return fetch(`${BASE_URL}/todos`).then(response => response.json());
};

export const getTodo = async todoId => {
  return fetch(`${BASE_URL}/todos/${todoId}`).then(response => response.json());
};

export const getUserTodos = async userId => {
  const todos = await getTodos();
  return todos.filter(todo => todo.userId === userId);
};

export const getFullTodos = async () => {
  const todos = await getTodos();
  const users = await getUsers();
  return todos.map(todo => {
    todo.username = users.find(user => user.id === todo.userId).username;
    return todo;
  });
};

import React, { useEffect } from 'react';

const Todos = ({
  // getTodos,
  todos,
  isFetching,
  lunch,
}) => {
  // useEffect(() => {
  //   getTodos();
  // }, []);
  return (
    <div>
      <header className="App-header">
        <h1>
          {lunch && lunch.name}
          {'-Todos'}
        </h1>
        {isFetching &&
          <h2>
            Loading...
          </h2>
        }
        {todos && todos.map(todo => (
          <p key={todo.id}>
          {todo.title}
          </p>
        ))}
      </header>
    </div>
  );
}

export default Todos;

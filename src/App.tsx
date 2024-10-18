/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { ErrorMessage } from './types/Error';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [temporaryTodo, setTemporaryTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch (err) {
        setErrorMessage('Unable to load todos');
      } finally {
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    };

    loadTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSetFilter = (filterType: Filter) => {
    setFilter(filterType);
  };

  const handleAddTodo = (newTodo: Todo) => {
    setTemporaryTodo(null);
    setTodos(prevState => [...prevState, newTodo]);
  };

  const handleAddTemporaryTodo = (tempTodo: Todo) => {
    setTemporaryTodo(tempTodo);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const handleToggleTodoStatus = (id: number) => {
    setTodos(prevState =>
      prevState.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onAddTodo={handleAddTodo}
          onAddTemporaryTodo={handleAddTemporaryTodo}
        />
        <TodoList
          temporaryTodo={temporaryTodo}
          todos={filteredTodos}
          onToggleTodoStatus={handleToggleTodoStatus}
        />
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filter={filter}
            onFilterChange={handleSetFilter}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {/* Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
        {errorMessage}
      </div>
    </div>
  );
};

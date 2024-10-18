import { useState } from 'react';
import { postTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  onAddTodo: (newTodo: Todo) => void;
  onAddTemporaryTodo: (tempoTodo: Todo) => void;
};

export const Header = ({ onAddTodo, onAddTemporaryTodo }: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const addTodo = async () => {
      try {
        const tempTodo = {
          id: 0,
          title: newTodoTitle,
          userId: 764,
          completed: false,
        };

        const newTodo = {
          title: newTodoTitle,
          userId: 764,
          completed: false,
        };

        onAddTemporaryTodo(tempTodo);

        const response = await postTodo(newTodo);

        onAddTodo(response);
      } catch {}
    };

    addTodo();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={addNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

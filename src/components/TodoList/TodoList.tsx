/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  temporaryTodo: Todo | null;
  onDeleteTodo: (id: number) => void;
  onToggleTodoStatus: (id: number) => void;
};

export const TodoList = ({
  todos,
  temporaryTodo,
  onDeleteTodo,
  onToggleTodoStatus,
}: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos &&
        todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onToggleTodoStatus={onToggleTodoStatus}
            />
          );
        })}
      {temporaryTodo && (
        <TodoItem
          key={temporaryTodo.id}
          todo={temporaryTodo}
          temporaryTodo={temporaryTodo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodoStatus={onToggleTodoStatus}
        />
      )}
    </section>
  );
};

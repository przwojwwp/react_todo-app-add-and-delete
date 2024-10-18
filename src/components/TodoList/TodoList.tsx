/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  temporaryTodo: Todo | null;
  onToggleTodoStatus: (id: number) => void;
};

export const TodoList = ({
  todos,
  temporaryTodo,
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
              onToggleTodoStatus={onToggleTodoStatus}
            />
          );
        })}
      {temporaryTodo && (
        <TodoItem
          todo={temporaryTodo}
          temporaryTodo={temporaryTodo}
          onToggleTodoStatus={onToggleTodoStatus}
        />
      )}
    </section>
  );
};

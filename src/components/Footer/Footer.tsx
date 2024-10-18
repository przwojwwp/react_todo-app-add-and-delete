import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onFilterChange: (filterType: Filter) => void;
  filter: Filter;
};

export const Footer = ({ todos, onFilterChange, filter }: Props) => {
  const countOfNotCompletedTodos = todos.filter(todo => !todo.completed).length;

  const filterOptions: {
    label: string;
    value: Filter;
    href: string;
    dataCy: string;
  }[] = [
    { label: 'All', value: 'all', href: '#/', dataCy: 'FilterLinkAll' },
    {
      label: 'Active',
      value: 'active',
      href: '#/active',
      dataCy: 'FilterLinkActive',
    },
    {
      label: 'Completed',
      value: 'completed',
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}

      <span className="todo-count" data-cy="TodosCounter">
        {countOfNotCompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterOptions.map(({ label, value, href, dataCy }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </a>
        ))}
        {/* <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a> */}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

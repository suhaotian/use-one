import * as React from 'react';
import {
  useTodoFilter,
  todoFilterActions,
  TodoFilterEnum,
} from './states/todoFilter';
import {
  useTodoList,
  todoListActions,
  todoListSelectors,
} from './states/todoList';
import {
  useTodoInputValue,
  todoInputValueActions,
} from './states/todoInputValue';

export function TodoListExample() {
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      <List />
    </>
  );
}

function TodoListStats() {
  useTodoFilter();
  useTodoList();

  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
    formattedPercentCompleted,
  } = todoListSelectors.getStats();

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

function TodoListFilters() {
  const [filter] = useTodoFilter();

  return (
    <>
      Filter:
      <select
        value={filter}
        onChange={e =>
          todoFilterActions.updateFilter(
            (e.target.value as any) as TodoFilterEnum
          )
        }
      >
        <option value={TodoFilterEnum['Show ALL']}>All</option>
        <option value={TodoFilterEnum['Show Completed']}>Completed</option>
        <option value={TodoFilterEnum['Show Uncompleted']}>Uncompleted</option>
      </select>
    </>
  );
}

function TodoItemCreator() {
  const [inputValue] = useTodoInputValue();

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={e => todoInputValueActions.changeValue(e.target.value)}
      />
      <button onClick={todoListActions.addItem}>Add</button>
    </div>
  );
}

function List() {
  useTodoFilter();
  useTodoList();

  return (
    <>
      {todoListSelectors.getFilterList().map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}

function TodoItem({ item }) {
  // @Bug: uncomment this line, then click add 4 times, and remove 4 times, you will see the bugs
  // useTodoList();

  return (
    <div id={item.id}>
      <input
        type="text"
        value={item.text}
        onChange={e => todoListActions.editItemText(e.target.value, item)}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => todoListActions.toggleItemCompletion(item)}
      />
      <button onClick={() => todoListActions.deleteItem(item)}>X</button>
    </div>
  );
}

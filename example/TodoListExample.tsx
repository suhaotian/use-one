import * as React from 'react';
import { useState, useMemo } from 'react';
import {
  useTodoFilter,
  todoFilterActions,
  TodoFilterEnum,
} from './states/useTodoFilter';
import {
  useTodoList,
  todoListActions,
  todoListSelectors,
  TodoItemType,
} from './states/todoList';
import {
  useTodoInputValue,
  todoInputValueActions,
} from './states/useTodoInputValue';
import { useTodoStats } from './states/useTodoStats';

function useUpdate(): [number, Function] {
  const [count, setCount] = useState(0);

  return [count, () => setCount(count + 1)];
}

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
  const [
    {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      // percentCompleted,
      formattedPercentCompleted,
    },
  ] = useTodoStats();

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
        <TodoItem key={todoItem.id} id={todoItem.id} />
      ))}
    </>
  );
}

function useTodoItemSelector(id: number): [TodoItemType, Function] {
  const [count, setUpdate] = useUpdate();
  const item = useMemo(() => todoListSelectors.getItem(id), [count]);

  return [item, setUpdate];
}

function TodoItem({ id }: { id: number }) {
  useTodoList();

  const [item, setUpdate] = useTodoItemSelector(id);

  return (
    <div>
      <input
        type="text"
        value={item.text}
        onChange={e => {
          const updatedItem = {
            ...item,
            text: e.target.value,
          };
          todoListActions.editItemText(updatedItem);
          setUpdate();
        }}
      />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={() => {
          const updatedItem = {
            ...item,
            isComplete: !item.isComplete,
          };
          todoListActions.toggleItemCompletion(updatedItem);
          setUpdate();
        }}
      />
      <button onClick={() => todoListActions.deleteItem(item)}>X</button>
    </div>
  );
}

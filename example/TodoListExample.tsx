import * as React from 'react';
import { useState, useMemo } from 'react';
import {
  todoListStore,
  TodoItemType,
} from './states/todo-list';
import {
  todoFilterStore,
  TodoFilterEnum,
} from './states/todo-filter';
import {
  todoInputValueStore,
} from './states/todo-input-value';
import { todoStatsStore } from './states/todo-stats';

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
  ] = todoStatsStore.use();

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
  const [filter] = todoFilterStore.use();

  return (
    <>
      Filter:
      <select
        value={filter}
        onChange={e =>
          todoFilterStore.updateFilter(
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
  const [inputValue] = todoInputValueStore.use();

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={e => todoInputValueStore.changeValue(e.target.value)}
      />
      <button onClick={todoListStore.addItem}>Add</button>
    </div>
  );
}

function List() {
  todoFilterStore.use();
  todoListStore.use();

  return (
    <>
      {todoListStore.getFilterList().map(todoItem => (
        <TodoItem key={todoItem.id} id={todoItem.id} />
      ))}
    </>
  );
}

function useTodoItemSelector(id: number): [TodoItemType, Function] {
  const [count, setUpdate] = useUpdate();
  const item = useMemo(() => todoListStore.getItem(id), [count]);

  return [item, setUpdate];
}

function TodoItem({ id }: { id: number }) {
  todoListStore.use();

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
          todoListStore.editItemText(updatedItem);
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
          todoListStore.toggleItemCompletion(updatedItem);
          setUpdate();
        }}
      />
      <button onClick={() => todoListStore.deleteItem(item)}>X</button>
    </div>
  );
}

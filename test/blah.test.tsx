import React from 'react';
import { createRoot } from 'react-dom/client';
import { CounterExample } from '../example/CounterExample';
import { create } from '../src';
import { countStore, useCount, actions as countActions, actions } from './useCountWithImmer';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const rootEl = createRoot(div);

    rootEl.render(<CounterExample />);
    rootEl.unmount();
  });

  it('create string', () => {
    const [, textStore] = create('');
    expect(textStore.getState()).toBe('');
    let textValue = '';
    const unsubscribe = textStore.subscribe(value => {
      textValue = value;
    });
    textStore.setState(() => 'hello');
    expect(textStore.getState()).toBe('hello');
    textStore.syncState('hello world');
    expect(textValue).toBe('hello');
    expect(textStore.getState()).toBe('hello world');

    unsubscribe();
    textStore.setState('hello useOne');

    expect(textStore.getState()).toBe('hello useOne');
    expect(textValue).toBe('hello');

    let t = '';
    textStore.subscribe(value => {
      t = value;
    });

    textStore.forceUpdate();

    expect(t === 'hello useOne');
    textStore.destroy();

    expect(textStore.getUpdateCount() === null);
    expect(textStore.getState() === null);
  });

  it('update state with immer', () => {
    let result = 0;
    countStore.subscribe(state => {
      result = state.count;
    })
    expect(countStore.getState().count).toBe(0);
    actions.increment();
    expect(countStore.getState().count).toBe(1);
    expect(result).toBe(1);
    actions.increment();
    expect(countStore.getState().count).toBe(2);
    expect(result).toBe(2);
    actions.decrement();
    actions.decrement();
    expect(countStore.getState().count).toBe(0);
    expect(result).toBe(0);
  })
});

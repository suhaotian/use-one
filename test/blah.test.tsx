import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CounterExample } from '../example/CounterExample';
import { createOne } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CounterExample />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('createOne string', () => {
    const [, textStore] = createOne('');
    expect(textStore.getState()).toBe('');
    let textValue = '';
    const unsubscribe = textStore.subscribe(value => {
      textValue = value;
    });
    textStore.replaceState('hello');
    expect(textStore.getState()).toBe('hello');
    textStore.syncState('hello world');
    expect(textValue).toBe('hello');
    expect(textStore.getState()).toBe('hello world');

    unsubscribe();
    textStore.replaceState('hello useOne');

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
});

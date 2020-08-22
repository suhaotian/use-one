import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../example/count';
import { createOne } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('createOne string', () => {
    const [, textStore] = createOne('');
    expect(textStore.getState()).toBe('');
    let textValue = '';
    const unsubscribe = textStore.subscribe(value => {
      textValue = value;
    });
    textStore.setState('hello');
    expect(textStore.getState()).toBe('hello');
    expect(textValue).toBe('hello');

    unsubscribe();
    textStore.setState('hello world');

    expect(textStore.getState()).toBe('hello world');
    expect(textValue).toBe('hello');
  });
});

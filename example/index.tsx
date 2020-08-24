import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CounterExample } from './CountExample';
import { Text, FontButton } from './FontSizeExample';
import { TodoListExample } from './TodoListExample';
import { RecoilTodoListExample } from './RecoilTodoListExample';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <div>
      <h3>FontSize example</h3>
      <Text />
      <FontButton />
      <br />
      <br />
      <h3>TodoListExample example</h3>
      <TodoListExample />
      <br />
      <br />
      <h3>RecoilTodoList example</h3>
      <RecoilRoot>
        <RecoilTodoListExample />
      </RecoilRoot>
      <br />
      <br />
      <h3>Counter example</h3>
      <CounterExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

import 'react-app-polyfill/ie11';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CounterExample } from './CounterExample';
import { Text, FontButton } from './FontSizeExample';
import { TodoListExample } from './TodoListExample';
import { RecoilTodoListExample } from './RecoilTodoListExample';
import { RecoilRoot } from 'recoil';

const App = () => {
  React.useEffect(() => {
    (window as any).onRender && (window as any).onRender('Rendered!');
    console.log('Rendered!');
  }, []);
  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
};


const root = createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(<App />);

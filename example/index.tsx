import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App as CounterExample } from './count';

const App = () => {
  return (
    <div>
      <CounterExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

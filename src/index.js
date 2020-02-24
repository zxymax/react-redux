import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { TodoList } from './components';

const App = () => {
  return (
    <div>
      <TodoList />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

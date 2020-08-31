import React, {Fragment} from 'react';
import './App.css';
import InputTodo from './components/InoputTodo'
import ListTodo from './components/ListTodo'

function App() {
  return (
    <Fragment>
      <div className='container'>
        <InputTodo />
        <ListTodo/>
      </div>
    </Fragment>
  );
}

export default App;

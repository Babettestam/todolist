import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from 'pages/Home/Home';
import reportWebVitals from './reportWebVitals';
import styles from 'styles/main.module.css';
import { TodoListProvider } from 'contexts/TodoListContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <div className={styles.main}>
    <header>
      <h1>To Do List</h1>
    </header>
    <main>
      <TodoListProvider>
        <Home />
      </TodoListProvider>
    </main>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

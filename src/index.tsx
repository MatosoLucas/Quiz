import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QuestionsProvider } from './context/QuestionsContext';

ReactDOM.render(
  <QuestionsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuestionsProvider>,
  document.getElementById('root')
);

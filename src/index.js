import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './component/LoginForm';
import LanguageForm from './component/LanguageForm';

ReactDOM.render(
  <React.StrictMode>
    <LoginForm />
    <LanguageForm />
  </React.StrictMode>,
  document.getElementById('root')
);

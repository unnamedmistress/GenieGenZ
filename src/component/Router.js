import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AppRouter = () => {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

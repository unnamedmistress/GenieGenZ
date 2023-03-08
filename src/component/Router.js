import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginForm from './LoginForm.js';
import SignupForm from './SignupForm.js';
import How from './How.js';

const AppRouter = () => {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="/" element={<LoginForm onSignupClick={() => history.push('/signup')} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/how" element={<How />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

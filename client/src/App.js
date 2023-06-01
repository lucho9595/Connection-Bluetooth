import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/home"
            element={
              <PrivateRoute
                component={Home}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

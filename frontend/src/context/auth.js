import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import * as AuthService from "../services/auth";

const AuthContext = React.createContext(null);

// TODO: Handle expired token

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({
  children,
  loginPage = "/",
  homePage = "/profile"
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const handleRegister = async (username, password, full_name) => {
    const response = await AuthService.register(username, password, full_name);
    setToken(response.access_token);
    setUser(response.user);
    navigate(homePage);
  };

  const handleLogin = async (username, password) => {
    const response = await AuthService.login(username, password);
    setToken(response.access_token);
    setUser(response.user);

    const origin = location.state?.from?.pathname || homePage;
    navigate(origin);
  };

  const handleLogout = () => {
    AuthService.logout().then(() => {
      setToken(null);
      setUser(null);
      navigate(loginPage);
    });
  };

  const value = {
    token,
    user,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
};

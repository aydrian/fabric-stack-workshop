import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useSessionStorage } from "hooks/use-session-storage";
import * as AuthService from "services/auth";

const AuthContext = React.createContext(null);

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

  const [session, setSession] = useSessionStorage("auth_session", null);

  const handleRegister = async (username, password, full_name) => {
    const response = await AuthService.register(username, password, full_name);
    setSession({ token: response.access_token, user: response.user });
    navigate(homePage);
  };

  const handleLogin = async (username, password) => {
    const response = await AuthService.login(username, password);
    setSession({ token: response.access_token, user: response.user });

    const origin = location.state?.from?.pathname || homePage;
    navigate(origin);
  };

  const handleLogout = () => {
    AuthService.logout().then(() => {
      setSession(null);
      navigate(loginPage);
    });
  };

  const handleUnauthorized = (err) => {
    if (err instanceof AuthService.AuthorizationError) {
      const loginMsg = "Session expired. Please log in again.";
      setSession(null);
      return navigate(loginPage, { state: { from: location, loginMsg } });
    }
    throw err;
  };

  const value = {
    token: session?.token,
    user: session?.user,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onUnauthorized: handleUnauthorized,
    loginPage,
    homePage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { homePage, loginPage, token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={loginPage} replace state={{ from: location }} />;
  }

  if (isAdmin && !user?.is_admin) {
    return <Navigate to={homePage} replace />;
  }

  return children ? children : <Outlet />;
};

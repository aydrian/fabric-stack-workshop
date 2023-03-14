import { Routes, Route } from "react-router-dom";

import PrivateLayout from "./components/private-layout";
import PublicLayout from "./components/public-layout";

import AdminPage from "./pages/admin";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="admin" element={<AdminPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;

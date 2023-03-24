import { Routes, Route } from "react-router-dom";

import PrivateLayout from "components/private-layout";
import PublicLayout from "components/public-layout";

import { ProtectedRoute } from "context/auth";

import AdminPage from "pages/admin";
import ProfilePage from "pages/profile";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";

import "./App.scss";
import "./blobz.scss";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route element={<ProtectedRoute isAdmin />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./Pages/App";
import Dashboard from "./Pages/Dashboard";
import Login from "./components/Login";
import CVConverterPDFFlowise from "./components/CVConverterPDFFlowise";
import { auth } from "./firebase";

function PrivateRoute({ children }: { children: JSX.Element }) {
  return auth.currentUser ? children : <Navigate to="/login" />;
}

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cv-converter" element={<CVConverterPDFFlowise />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

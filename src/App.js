import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthGuard } from "./Components/AuthGuard";
import NavBar from "./Components/NavBar";
import PrivateRoute from "./Components/PrivateRoute";
import EditResgisterWrapper from "./Pages/EditRegisterPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <AuthGuard />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/register/:id"
          element={
            <PrivateRoute>
              <EditResgisterWrapper />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthGuard } from "./Components/AuthGuard";
import NavBar from "./Components/NavBar";
import PrivateRoute from "./Components/PrivateRoute";
import PageNotFound from "./Pages/404Page";
import DashBoard from "./Pages/Dashboard";
import EditResgisterWrapper from "./Pages/EditRegisterPage";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Register from "./Pages/Register";
import TodoPage from "./Pages/TodoPage";

function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <AuthGuard />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }>
           <Route path="" element={<PrivateRoute><TodoPage /></PrivateRoute>} />
          <Route path="profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

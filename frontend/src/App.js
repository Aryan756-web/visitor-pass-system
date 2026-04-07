import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Visitor from "./pages/Visitor";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        {token && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/visitors"
            element={token ? <Visitor /> : <Navigate to="/login" />}
          />

          <Route
            path="/appointments"
            element={token ? <Appointment /> : <Navigate to="/login" />}
          />

          <Route
            path="/"
            element={<Navigate to={token ? "/visitors" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
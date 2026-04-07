import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/visitors" style={{ marginRight: "10px" }}>
        Visitors
      </Link>

      <Link to="/appointments" style={{ marginRight: "10px" }}>
        Appointments
      </Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
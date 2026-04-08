import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const loginUser = async () => {
  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    const res = await axios.post(
      "https://visitor-pass-system-1.onrender.com/api/auth/login",
      { email, password }
    );

    console.log(res.data);

    localStorage.setItem("token", res.data.token);

    alert("Login successful");

    navigate("/visitors");

  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;

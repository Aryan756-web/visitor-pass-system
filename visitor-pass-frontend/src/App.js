import Login from "./pages/Login";
import Visitor from "./pages/Visitor";
import Appointment from "./pages/Appointment";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Visitor Pass System</h1>

      {token ? (
        <>
          <Visitor />
          <Appointment />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
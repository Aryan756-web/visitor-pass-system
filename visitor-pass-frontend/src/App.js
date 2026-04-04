import Login from "./pages/Login";
import Visitor from "./pages/Visitor";
import Appointment from "./pages/Appointment";

function App() {
  const token = localStorage.getItem("token");

 return (
  <div>
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

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import NavAdmin from "./components/NavAdmin";

import "./App.css";

function App() {
  return (
    <main className="container">
      <div className="App">
        <NavAdmin />
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default App;

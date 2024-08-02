import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <main className="container">
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </main>
  );
}

export default App;

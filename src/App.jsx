import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rifas from "./pages/Rifas";
import Comprar from "./pages/Comprar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rifas" element={<Rifas />} />
        <Route path="/comprar" element={<Comprar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
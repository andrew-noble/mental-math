import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Quiz from "./components/Quiz.jsx";
import Menu from "./components/Menu.jsx";

export default function App() {
  const [module, setModule] = useState("multiplication");

  const handleModuleChange = (module) => {
    setModule(module);
  };

  return (
    <BrowserRouter basename="/mental-math">
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/">Quiz</Link> | <Link to="/menu">Menu</Link>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Quiz module={module} />} />
          <Route
            path="/menu"
            element={<Menu changeModule={handleModuleChange} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

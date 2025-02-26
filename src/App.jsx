import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import Quiz from "./pages/Quiz.jsx";
import Modules from "./pages/Modules.jsx";
import Stats from "./pages/Stats.jsx";
import Info from "./pages/Info.jsx";

export default function App() {
  const [module, setModule] = useState("multiplication");

  const handleModuleChange = (module) => {
    setModule(module);
  };

  return (
    <BrowserRouter basename="/mental-math">
      {/* Navigation */}
      <nav className="p-4 flex justify-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors ${
              isActive ? "text-blue-500" : "hover:text-blue-500"
            }`
          }
        >
          Quiz
        </NavLink>
        <NavLink
          to="/modules"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors ${
              isActive ? "text-blue-500" : "hover:text-blue-500"
            }`
          }
        >
          Modules
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors ${
              isActive ? "text-blue-500" : "hover:text-blue-500"
            }`
          }
        >
          Stats
        </NavLink>
        <NavLink
          to="/info"
          className={({ isActive }) =>
            `text-lg font-medium transition-colors ${
              isActive ? "text-blue-500" : "hover:text-blue-500"
            }`
          }
        >
          Info
        </NavLink>
      </nav>

      {/* Route definitions */}

      <Routes>
        <Route path="/" element={<Quiz module={module} />} />
        <Route
          path="/modules"
          element={<Modules changeModule={handleModuleChange} />}
        />
        <Route path="/stats" element={<Stats module={module} />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

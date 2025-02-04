import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Quiz from "./components/Quiz.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/mental-math">
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/">Quiz</Link> | <Link to="/menu">Menu</Link>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/menu" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Simple Home component
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

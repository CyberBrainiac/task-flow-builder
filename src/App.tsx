import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/error" className="ml-2 text-blue-500 hover:underline">
              Error Page
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">Study Sprint</div>

      <div className="nav-links">
        <Link to="/">Timer</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
}
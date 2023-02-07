import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <nav className="menu">
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

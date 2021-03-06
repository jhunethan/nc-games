import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(props) {
  const { user } = props;
  
  return (
    <div className="header">
      <Link to="/" className="header__h1">
        <h1 className="header__h1">NC Game Reviews</h1>
      </Link>
      {user ? (
        <div className="header__align_right">Logged in as {user.username}</div>
      ) : (
        <Link to="/login" className="header__button header__align_right">
          Login
        </Link>
      )}
    </div>
  );
}

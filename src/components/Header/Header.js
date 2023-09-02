import "./Header.scss";
import logo from "../../assets/logos/hucu-logo.svg";
import { Link } from "react-router-dom";

function Header({ loginoutClickHandler, isLoggedIn, username }) {
  return (
    <div className="header__container">
      <Link className="header__logo-link" to="/">
        <div className="header__logo">
          <img className="header__logo-image" src={logo}></img>
          <h1 className="header__title">HUCU</h1>
        </div>
      </Link>
      <div className="header__login-container">
        {isLoggedIn && <span>{username} |</span>}
        <span className="header__loginout" onClick={loginoutClickHandler}>
          {isLoggedIn ? "Logout" : "Login"}
        </span>
      </div>
    </div>
  );
}

export default Header;

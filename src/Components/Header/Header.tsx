import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

export const Header = (): JSX.Element => {

  return (
    <NavLink to="/" id="logo" className="header-container">
      <img className="logo-img" src={logo}></img>
    </NavLink>
  );
};
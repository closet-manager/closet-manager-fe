import "./Home.css";
import { Link } from "react-router-dom";
import React from "react";

interface MenuItem {
  text: string;
  path: string;
}

export const AppMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    { text: "My Closet", path: "/myCloset" },
    { text: "My Lists", path: "/lists" },
    { text: "Add New Item", path: "/addItem" },
    { text: "Create New List", path: "/addList" },
  ];
  return (
    <div className="home-container">
      {menuItems.map(({ text, path }, index) => (
        <Link className="menu-item" key={index} to={path}>
          <div className="menu-text">{text}</div>
        </Link>
      ))}
    </div>
  );
};

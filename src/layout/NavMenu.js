import React from "react";
import { menuItem } from "./MenuItem";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        {menuItem().map((item) => (
          <li key={item.name}>
            <Link to={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;

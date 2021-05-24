import * as React from "react";
import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.sass";
import { useCollection } from "../utils/collection";

import collectionIcon from "../assets/collection.svg";
import collectionIconFull from "../assets/collection-full.svg";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  let CollectionCount = () => {
    const [collection] = useCollection();
    const count = collection.length;

    return (
      <NavLink
        activeClassName="active"
        to="/collection"
        className="header-link px-2 px-md-4"
      >
        <div
          className="collection-icon"
          style={{
            backgroundImage:
              count > 0
                ? `url(${collectionIconFull})`
                : `url(${collectionIcon})`,
          }}
        ></div>
        {count}
      </NavLink>
    );
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light border-bottom border-dark pb-0 py-md-0">
      <div className="container-fluid px-0">
        <Link className="navbar-brand ps-3 pb-3 pb-md-2" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler mb-2 me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTop"
          aria-controls="navbarTop"
          aria-label="Toggle navigation"
          aria-expanded={!isNavCollapsed ? true : false}
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarTop"
        >
          <div className="header-links d-flex justify-content-space-between">
            <NavLink
              to="/explore"
              activeClassName="active"
              className="header-link px-2 px-md-4"
            >
              Explore
            </NavLink>
            <NavLink
              to="/about"
              activeClassName="active"
              className="header-link px-2 px-md-4"
            >
              About
            </NavLink>
            <NavLink
              to="/submit"
              activeClassName="active"
              className="header-link px-2 px-md-4"
            >
              Submit
            </NavLink>
            <CollectionCount />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

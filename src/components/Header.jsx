import * as React from 'react';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom'
import './Header.sass'

const Header = () => {
  return (
    <div className="header">
      <Link to="/"><img src={logo} alt="logo"/></Link>
      <div className="header-links">
        <Link to="/explore" className="header-link">Explore</Link>
        <Link to="/about" className="header-link">About</Link>
        <a href="#" className="header-link">Sumbit</a>
      </div>
    </div>
  );
};

export default Header;
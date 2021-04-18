import * as React from 'react';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom'
import './Header.sass'
import {useCollection} from '../utils/collection'

import collectionIcon from '../assets/collection.svg';
import collectionIconFull from '../assets/collection-full.svg';


const Header = () => {
  let CollectionCount = () => {
    const [collection] = useCollection()
    const count = collection.length
    return <Link to="/collection" className="header-link">
              <div className="collection-icon" style={{ backgroundImage: count > 0 ? `url(${collectionIconFull})`: `url(${collectionIcon})` }}></div>
              {count}
          </Link>
  }

  return (
      <div className="header">
        <Link to="/"><img src={logo} alt="logo"/></Link>
        <div className="header-links">
          <Link to="/explore" className="header-link">Explore</Link>
          <Link to="/about" className="header-link">About</Link>
          <a href="#" className="header-link">Submit</a>
          <CollectionCount />
        </div>
      </div>
  );
};

export default Header;
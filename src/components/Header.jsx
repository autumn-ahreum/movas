import { useState, useEffect } from 'react'
import { Link, useActionData } from 'react-router-dom'
import Nav from './Nav';

const Header = () => {
  
  const [ showNav, setShowNav ] = useState(false);

  function toggleNav() {
    setShowNav(!showNav);
  }

  return (
    <div>
    <header className= {showNav ? 'show' : ''}>
          <div className= "logo-box">
            <Link to="/"><h1>MOVAS</h1></Link>
          </div>
          <button className="btn-hamburger" 
                  onMouseDown= {(e) => { e.preventDefault(); }}
                  onClick= { toggleNav }
                  > 
              {/**
               * found at this url:
               * https://codepen.io/RRoberts/pen/ZBYaJr
               **/}
              <span className="hamburger" id="hamburger">
                      <span className="line"></span>
                      <span className="line"></span>
                      <span className="line"></span>
              </span>
              <span className="sr-only">Menu</span>
          </button>
          <Nav className="main-nav" 
               handleShowHideNav={ toggleNav }/>
    </header>
    </div>
  );
};

export default Header;
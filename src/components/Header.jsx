import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav';

//title font candidates 
// import '@fontsource/notable';
// import '@fontsource/shrikhand';

// font candidates 
// import '@fontsource/questrial';

const Header = () => {
  
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  }

//   useEffect(() => {
//     let mediaQuery = window.matchMedia('(min-width: 600px)');

// }, []);

  return (
    <div>
    <header className= {showNav ? 'show' : ''}>
          <div className= "logo-box">
            <Link to="/"><h1>MOVAS</h1></Link>
          </div>
          <button className="btn-hamburger"
                  onMouseDown= {(e) => { e.preventDefault(); }}
                  onClick= {toggleNav}
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
          <Nav className="main-nav"/>
    </header>
    </div>
  );
};

export default Header;
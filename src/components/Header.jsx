import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav';
import styles from '../styles/Header.module.css'

//title font candidates 
import '@fontsource/notable';
import '@fontsource/shrikhand';

// font candidates 
import '@fontsource/questrial';

const Header = () => {

    // const [ showNav, setShowNav ] = useState(false);
    
    // function toggleNav() {
    //     setShowNav(!showNav);

    // }
    // useEffect ( () => {
    //     let mediaQuery = window.matchMedia('(min-width: 600px)');
    //     mediaQuery.addEventListener('change', isDesktop);

    //     return () => mediaQuery.removeEventListener('change', isDesktop)

    // }, [])

    // function isDesktop(e) {
    //     if(e.matches) {
    //         showNav(true);
    //     }
    

  return (
    <div>
     {/* <header className={ showNav ? 'show' : '' }> */}
    <header>
          <div className={styles.logoBox}>
            <Link to="/"><h1>MOVAS</h1></Link>
          </div>
          <button className={styles.hamburgerMenu}> 
              {/**
               * found at this url:
               * https://codepen.io/RRoberts/pen/ZBYaJr
               **/}
              <div className={styles.hamburger} id="hamburger">
                      <span className={styles.line}></span>
                      <span className={styles.line}></span>
                      <span className={styles.line}></span>
              </div>
          </button>
          <Nav className={styles.mainNav} />
    </header>
    </div>
  )
}

export default Header;
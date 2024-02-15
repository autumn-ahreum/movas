import { NavLink } from 'react-router-dom';
import styles from '../styles/Nav.module.css';
const Nav = () => {

  // function closeNav(e){
      // if( window.innerWidth < 600 ) {
      //     // call a function
      //     handleShowHideNav()
      // } else {
      //     e.target.blur();
      // }
  // }
  
  return (
      <nav className={styles.mainNav}
      >
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/mylist">My List</NavLink></li>
          </ul>
      </nav>    
  )
}

export default Nav;
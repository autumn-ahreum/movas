import { NavLink } from 'react-router-dom';
const Nav = ( { handleShowHideNav  }) => {

    function closeNav(e){
        if( window.innerWidth < 640 ) {
            // call a function through props
            handleShowHideNav()
        } else {
            e.target.blur();
        }
    }

  return (
      <nav className= "main-nav"
            onClick={ closeNav }
      >
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/mylist">My List</NavLink></li>
              <li><NavLink to="/search">Search</NavLink></li>
          </ul>
      </nav>    
  )
}

export default Nav;
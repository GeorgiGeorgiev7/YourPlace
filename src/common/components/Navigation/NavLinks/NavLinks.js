import './NavLinks.css';

import { NavLink } from 'react-router-dom';


const NavLinks = () => {
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/">ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/uid1/places">MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
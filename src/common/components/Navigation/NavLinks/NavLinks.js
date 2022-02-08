import './NavLinks.css';

import { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';


const NavLinks = () => {
    const { isLoggedIn } = useContext(AuthContext);


    return (
        <ul className='nav-links'>
            <li>
                <NavLink to="/">ALL USERS</NavLink>
            </li>
            {isLoggedIn &&
                <li>
                    <NavLink to="/uid1/places">MY PLACES</NavLink>
                </li>
            }
            {isLoggedIn &&
                <li>
                    <NavLink to="/places/new">ADD PLACE</NavLink>
                </li>
            }
            {!isLoggedIn &&
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            }
        </ul>
    );
};

export default NavLinks;
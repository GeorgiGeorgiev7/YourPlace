import './MainNav.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from "../MainHeader/MainHeader";
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';


const MainNav = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawer = () => {
        setDrawerIsOpen(false);
    };
    console.log(<Backdrop/>);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
            {drawerIsOpen &&
                (
                    <SideDrawer>
                        <nav className='main-drawer-nav'>
                            <NavLinks />
                        </nav>
                    </SideDrawer>
                )
            }
            <MainHeader>
                <button
                    className='main-navigation__menu-btn'
                    onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>YourPlace</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNav;

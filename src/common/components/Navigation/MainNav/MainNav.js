import styles from './MainNav.module.css';
import { Link } from 'react-router-dom';

import MainHeader from "../MainHeader/MainHeader";


const MainNav = () => {
    return (
        <MainHeader>
            <button className={styles['main-navigation__menu-btn']}>
                <span />
                <span />
                <span />
            </button>
            <h1 className={styles['main-navigation__title']}>
                <Link to='/'>YourPlace</Link>
            </h1>
            <nav>
                ...
            </nav>
        </MainHeader>
    );
};

export default MainNav;

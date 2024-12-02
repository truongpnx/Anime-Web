import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { publicRoutes } from '../../../../routes';

const menuItem = [
    { text: 'Homepage', path: publicRoutes.home.path },
    { text: 'Categories', path: publicRoutes.categories.path },
    { text: 'Our Blog', path: publicRoutes.blog.path },
    { text: 'Contacts', path: publicRoutes.contacts.path },
];

function Header() {
    const location = useLocation();

    const [visibleMenu, setVisibleMenu] = useState(false);

    const hanleMobileMenuClick = () => {
        setVisibleMenu(!visibleMenu);
    };

    return (
        <header className={styles.wrapper}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <img src={images.logo} alt="logo" />
                    </div>
                    <div className={styles['menu-col']}>
                        <ul className={styles['menu-container']}>
                            {menuItem.map((item, index) => (
                                <li className={clsx({ [styles.active]: item.path === location.pathname })} key={index}>
                                    <Link to={item.path}>
                                        {item.text}
                                        {item.text === 'Categories' && <span className={styles['arrow_down']} />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['user-action']}>
                        <FontAwesomeIcon className={styles['icon-search']} icon={faMagnifyingGlass} />
                        <Link to={'/login'}>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                </div>
                <div className={styles['mobile-menu']}>
                    <button className={styles['mobile-menu-btn']} onClick={hanleMobileMenuClick}>
                        MENU
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {visibleMenu && (
                        <ul className={styles['mobile-menu-container']}>
                            {menuItem.map((item, index) => (
                                <li key={index}>
                                    <Link to={item.path}>
                                        {item.text}
                                        {item.text === 'Categories' && <span className={styles['arrow_down']} />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

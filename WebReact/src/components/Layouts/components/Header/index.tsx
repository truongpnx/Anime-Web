import React from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Link, useLocation } from 'react-router-dom';

const menuItem = [
    { text: 'Homepage', path: '/' },
    { text: 'Categories', path: '/categories' },
    { text: 'Our Blog', path: '/blog' },
    { text: 'Contacts', path: '/contacts' },
];

function Header() {
    const location = useLocation();

    return (
        <header className={styles.wrapper}>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles['col-lg-2']}>
                        <img src={images.logo} alt="logo" />
                    </div>
                    <div className={styles['col-lg-8']}>
                        <ul className={styles['menu-container']}>
                            {menuItem.map((item, index) => (
                                <li className={clsx({ [styles.active]: item.path === location.pathname })} key={index}>
                                    <Link to={item.path}>{item.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['col-lg-2']}>User action</div>
                </div>
                <div className={styles['mobile-menu']}>Mobile Menu</div>
            </div>
        </header>
    );
}

export default Header;

import React from 'react';

import styles from './Footer.module.scss';
import images from '../../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    const hanldeScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.wrapper}>
            <div className="container">
                <div className={styles['page-up']}>
                    <button className={styles['scroll-up-btn']} onClick={hanldeScrollToTop}>
                        <span className={styles['arrow-up']} />
                    </button>
                </div>
                <div className={styles.row}>
                    <div className={styles.logo}>
                        <img src={images.logo} alt="logo" />
                    </div>
                    <div className={styles['copy-right']}>
                        Copyright ©{new Date().getFullYear()} All rights reserved | This template is made with
                        <FontAwesomeIcon icon={faHeart} />
                        by
                        <a href="https://colorlib.com" target="_blank" rel="noreferrer">
                            Colorlib
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

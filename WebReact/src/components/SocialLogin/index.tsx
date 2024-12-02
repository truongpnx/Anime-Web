import React from 'react';

import styles from './SocialLogin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function SocialLogin() {
    return (
        <ul className={styles.wrapper}>
            <li>
                <a className={styles.facebook} href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} />
                    Sign in With Facebook
                </a>
            </li>
            <li>
                <a className={styles.google} href="https://www.google.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGoogle} />
                    Sign in With Google
                </a>
            </li>
            <li>
                <a className={styles.twitter} href="https://x.com/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} />
                    Sign in With Twitter
                </a>
            </li>
        </ul>
    );
}

export default SocialLogin;

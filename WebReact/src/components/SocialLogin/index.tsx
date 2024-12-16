import React from 'react';

import styles from './SocialLogin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { backendURL } from '../../constants';

function navigate(url: string) {
    window.location.href = url;
}

async function auth(media: string) {
    const currentUrl = window.location.href;
    const response = await fetch(`${backendURL}/oauth/request/${media}?state=${encodeURIComponent(currentUrl)}`, {
        method: 'POST',
    });
    const data = await response.json();
    navigate(data.url);
}

function SocialLogin() {
    return (
        <ul className={styles.wrapper}>
            <li>
                <p className={styles.facebook}>
                    <FontAwesomeIcon icon={faFacebookF} />
                    Sign in With Facebook
                </p>
            </li>
            <li>
                <p className={styles.google} onClick={() => auth('google')}>
                    <FontAwesomeIcon icon={faGoogle} />
                    Sign in With Google
                </p>
            </li>
            <li>
                <p className={styles.twitter}>
                    <FontAwesomeIcon icon={faXTwitter} />
                    Sign in With Twitter
                </p>
            </li>
        </ul>
    );
}

export default SocialLogin;

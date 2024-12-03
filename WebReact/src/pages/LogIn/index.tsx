import React from 'react';
import SocialLogin from '../../components/SocialLogin';

import styles from './Login.module.scss';
import images from '../../assets/images';
import { Form, Link } from 'react-router-dom';
import { publicRoutes } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function LogIn() {
    return (
        <>
            <section className={styles.breadcrum} style={{ backgroundImage: `url(${images.hero})` }}>
                <div className="container">
                    <div className={styles.text}>
                        <h2>Login</h2>
                        <p>Welcome to the official Anime blog.</p>
                    </div>
                </div>
            </section>
            <section className={styles['login-container']}>
                <div className="container">
                    <div className={styles.login}>
                        <div className={styles['login-form']}>
                            <div className={styles.form}>
                                <h3>Login</h3>
                                {/* {TODO: use Form component} */}
                                <form method="post">
                                    <div className={styles['input-item']}>
                                        <input type="email" placeholder="Email address" required />
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div className={styles['input-item']}>
                                        <input type="text" placeholder="Password" required />
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <button type="submit" className={styles['submit-btn']}>
                                        Login Now
                                    </button>
                                </form>
                                <Link className={styles['forget-pass']} to={publicRoutes.signUp.path}>
                                    Forgot Your Password?
                                </Link>
                            </div>
                        </div>
                        <div className={styles['login-register']}>
                            <div className={styles.register}>
                                <h3>Doesn't Have An Account?</h3>
                                <Link to={publicRoutes.signUp.path} className={styles['register-btn']}>
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles['login-social']}>
                        <div>
                            <span>OR</span>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LogIn;

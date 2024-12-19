import React, { useEffect, useState } from 'react';
import SocialLogin from '../../components/SocialLogin';

import styles from './Login.module.scss';
import images from '../../assets/images';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import { publicRoutes } from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginActionResult } from '../../routes/actions/loginAction';

function LogIn() {
    const actionData = useActionData() as LoginActionResult;
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (!actionData) {
            return;
        }

        if (actionData?.error === undefined) {
            return navigate('/dashboard');
        }

        setError(actionData?.error);
        const timer = setTimeout(() => {
            setError(undefined);
        }, 5000);

        return () => clearTimeout(timer);
    }, [actionData, navigate]);

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
                                {error && <p className={styles.error}>{error}</p>}
                                <Form method="post" action="/login">
                                    <div className={styles['input-item']}>
                                        <input type="email" name="email" placeholder="Email address" required />
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div className={styles['input-item']}>
                                        <input type="text" name="password" placeholder="Password" required />
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <button type="submit" className={styles['submit-btn']}>
                                        Login Now
                                    </button>
                                </Form>
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

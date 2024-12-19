import React, { useEffect, useState } from 'react';

import styles from './SignUp.module.scss';
import images from '../../assets/images';
import SocialLogin from '../../components/SocialLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { publicRoutes } from '../../routes';
import { Form, Link, useActionData } from 'react-router-dom';
import { SignUpActionResult } from '../../routes/actions/registerAction';

function SignUp() {
    const actionData = useActionData() as SignUpActionResult;
    console.log(actionData);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData.error);
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [actionData]);

    return (
        <>
            <section className={styles.breadcrum} style={{ backgroundImage: `url(${images.hero})` }}>
                <div className="container">
                    <div className={styles.text}>
                        <h2>Sign Up</h2>
                        <p>Welcome to the official Anime blog.</p>
                    </div>
                </div>
            </section>

            <section className={styles['signup-container']}>
                <div className="container">
                    <div className={styles.signup}>
                        <div className={styles['signup-form']}>
                            <div className={styles.form}>
                                <h3>Sign Up</h3>
                                {error && <p className={styles.error}>{error}</p>}
                                <Form method="post" action="/signUp">
                                    <div className={styles['input-item']}>
                                        <input type="email" name="email" placeholder="Email address" required />
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div className={styles['input-item']}>
                                        <input type="text" name="user-name" placeholder="Your Name" required />
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <div className={styles['input-item']}>
                                        <input type="text" name="password" placeholder="Password" required />
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <button type="submit" className={styles['submit-btn']}>
                                        Register Now
                                    </button>
                                </Form>
                                <h5>
                                    Already have an account?
                                    <Link to={publicRoutes.logIn.path}>Log In!</Link>
                                </h5>
                            </div>
                        </div>
                        <div className={styles['login-social']}>
                            <h3>Login With:</h3>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignUp;

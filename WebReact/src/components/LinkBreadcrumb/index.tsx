import React, { Fragment } from 'react';

import styles from './LinkBreadcrumb.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faHouse } from '@fortawesome/free-solid-svg-icons';

interface LinkBreadcrumbProps {
    internalLinks?: { text: string; path: string }[];
    current: string;
}

function LinkBreadcrumb({ internalLinks = [], ...props }: LinkBreadcrumbProps) {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles['links-container']}>
                    <div className={styles.links}>
                        <Link to="/">
                            <FontAwesomeIcon icon={faHouse} className={styles.house} />
                            Home
                            <FontAwesomeIcon icon={faAngleUp} className={styles.arrow} rotation={90} />
                        </Link>
                        &nbsp;
                        {internalLinks.map((e, idx) => (
                            <Fragment key={idx}>
                                <Link to={e.path}>
                                    {e.text}
                                    <FontAwesomeIcon icon={faAngleUp} className={styles.arrow} rotation={90} />
                                </Link>
                                &nbsp;
                            </Fragment>
                        ))}
                        <span>{props.current}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkBreadcrumb;

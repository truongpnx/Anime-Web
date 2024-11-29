import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Comment.module.scss';
import hero_img from '../../assets/images/hero.jpg';

interface ItemProps {
    className?: string;
    style?: React.CSSProperties;
}

function Item(props: ItemProps) {
    const [classes, setClasses] = useState<string[]>([]);

    useEffect(() => {
        setClasses(['Anime', 'Movie']);
    }, []);

    return (
        <div className={clsx(styles.item, props.className)} style={{ ...props.style }}>
            <div className={styles.picture}>
                <img src={hero_img} alt="" />
            </div>
            <div className={styles['item-text']}>
                <ul className={styles.classes}>
                    {classes.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
                <h5 className={styles.name}>
                    <Link to="/">The Seven Deadly Sins: Wrath of the Gods</Link>
                </h5>
                <span className={styles.view}>
                    <FontAwesomeIcon icon={faEye} />
                    19.141 Viewes
                </span>
            </div>
        </div>
    );
}

function Comment() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h5>New Comment</h5>
            </div>
            {[...Array(3)].map((_, idx) => (
                <Item key={idx} />
            ))}
        </div>
    );
}

export default Comment;

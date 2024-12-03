import React, { useEffect, useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Recommend.module.scss';
import clsx from 'clsx';
import images from '../../assets/images';
import { Link } from 'react-router-dom';

interface RecommendItemProps {
    className?: string;
    style?: React.CSSProperties;
}

export function RecommendItem(props: RecommendItemProps) {
    return (
        <div
            className={clsx(styles.item, props.className)}
            style={{ backgroundImage: `url(${images.hero})`, ...props.style }}
        >
            <div className={styles.ep}>18 / ?</div>
            <div className={styles.view}>
                <FontAwesomeIcon icon={faEye} />
                9141
            </div>
            <h5 className={styles.name}>
                <Link to="/">The Seven Deadly Sins: Wrath of the Gods</Link>
            </h5>
        </div>
    );
}

const filterValues = ['Day', 'Week', 'Month', 'Years'];

function Recommend() {
    const [filter, setFilter] = useState('Day');
    const [items, setItems] = useState<{ id: number; key: string }[]>([]);
    const [isUnmounting, setIsUnmounting] = useState(false);

    const hanldeOnClickFilter = (value: string) => {
        if (filter !== value) {
            setIsUnmounting(true); // Trigger unmount animation
            setTimeout(() => {
                setFilter(value); // Change filter
                setIsUnmounting(false); // Mount new items
                setItems([
                    { id: 1, key: `${value}-1` },
                    { id: 2, key: `${value}-2` },
                    { id: 3, key: `${value}-3` },
                ]);
            }, 600); // Match CSS unmount animation duration
        }
    };

    useEffect(() => {
        setItems([
            { id: 1, key: `${filter}-1` },
            { id: 2, key: `${filter}-2` },
            { id: 3, key: `${filter}-3` },
        ]);
    }, [filter]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h5>Top Views</h5>
            </div>
            <ul className={styles.filter}>
                {filterValues.map((e) => (
                    <li
                        key={e}
                        className={clsx({ [styles.active]: filter === e })}
                        onClick={() => hanldeOnClickFilter(e)}
                    >
                        {e}
                    </li>
                ))}
            </ul>
            <div className={styles.gallery}>
                {items.map((it) => (
                    <RecommendItem key={it.key} className={clsx({ [styles.unmounting]: isUnmounting })} />
                ))}
            </div>
        </div>
    );
}

export default Recommend;

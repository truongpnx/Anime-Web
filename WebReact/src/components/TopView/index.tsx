import React, { useEffect, useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './TopView.module.scss';
import clsx from 'clsx';
import hero_img from '../../assets/images/hero.jpg';
import { Link } from 'react-router-dom';

interface ItemProps {
    className?: string;
    style?: React.CSSProperties;
}

function Item(props: ItemProps) {
    return (
        <div
            className={clsx(styles.item, props.className)}
            style={{ backgroundImage: `url(${hero_img})`, ...props.style }}
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

function TopView() {
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
            <div
                className={styles.gallery}
                // style={{
                //     perspective: '3000px',
                //     perspectiveOrigin: '50% 50%',
                //     height: '1030px',
                //     width: '360px',
                //     transition: 'height 600ms, width 600ms',
                // }}
            >
                {items.map((it) => (
                    <Item key={it.key} className={clsx({ [styles.unmounting]: isUnmounting })} />
                ))}
            </div>
        </div>
    );
}

export default TopView;

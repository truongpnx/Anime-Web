import React from 'react';

import styles from './Rating.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

function RatingStar({ ratio, className, style }: { ratio: number; className?: string; style?: React.CSSProperties }) {
    const clampedRatio = Math.max(0, Math.min(1, ratio)) * 100;

    return (
        <div className={clsx(styles.star, className)} style={style}>
            <FontAwesomeIcon className={styles['background-star']} icon={emptyStar} />
            <FontAwesomeIcon
                className={styles['foreground-star']}
                icon={filledStar}
                style={{ clipPath: `inset(0 ${100 - clampedRatio}% 0 0)` }}
            />
        </div>
    );
}

function Rating({
    numStar = 5,
    point = 0,
    className = '',
    style,
}: {
    numStar?: number;
    point?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    if (numStar < point) {
        console.error(`Num start: ${numStar} is less then Point: ${point}`);
    }

    let ratios = Array(numStar).fill(0);
    for (let i = 0; i < numStar; i++) {
        if (point > i + 1) {
            ratios[i] = 1;
        } else {
            ratios[i] = point - i;
            break;
        }
    }

    return (
        <div className={clsx(styles.wrapper, className)} style={style}>
            {ratios.map((ratio, idx) => (
                <RatingStar key={idx} ratio={ratio} />
            ))}
        </div>
    );
}

export default Rating;

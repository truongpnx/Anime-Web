import React, { useEffect, useState } from 'react';

import styles from './ReviewItem.module.scss';
import images from '../../../assets/images';

interface ReviewItemProps {
    userName: string;
    timeStamp: number;
    comment: string;
}

function ReviewItem(props: ReviewItemProps) {
    const [timeString, setTimeString] = useState(getTimeString(props.timeStamp));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeString(getTimeString(props.timeStamp));
        }, 60000);

        return () => clearInterval(interval);
    }, [props]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.pic}>
                <img src={images.review} alt="" />
            </div>
            <div className={styles.text}>
                <h6>
                    {props.userName} -<span>{timeString}</span>
                </h6>
                <p>{props.comment}</p>
            </div>
        </div>
    );
}

function getTimeString(timeStamp: number) {
    let delta = Math.floor((Date.now() - timeStamp) / 1000); //milisec

    // if less than 1 minute
    if (delta < 60) return 'Few Seconds ago';

    // if less than 1 hour
    if (delta < 3600) {
        return `${Math.floor(delta / 60)} Minute ago`;
    }

    // if less than 24 hour
    if (delta < 86400) {
        return `${Math.floor(delta / 3600)} Hour ago`;
    }

    // to days
    return `${Math.floor(delta / 86400)} Days ago`;
}

export default ReviewItem;

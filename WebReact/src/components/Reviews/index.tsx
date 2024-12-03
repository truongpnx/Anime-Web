import React from 'react';
import ReviewItem from './ReviewItem';

import styles from './Reviews.module.scss';

const dummyData = {
    userName: 'User name',
    timeStamp: Date.now(),
    comment: 'User comment',
};

function Reviews() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h5>Reviews</h5>
            </div>
            <ReviewItem userName={dummyData.userName} timeStamp={dummyData.timeStamp} comment={dummyData.comment} />
            <ReviewItem userName={''} timeStamp={1733123809000} comment={''} />
            {/* <ReviewItem userName={''} timeStamp={1732951009000} comment={''} /> */}
            {/* <ReviewItem userName={''} timeStamp={1733120209000} comment={''} /> */}
        </div>
    );
}

export default Reviews;

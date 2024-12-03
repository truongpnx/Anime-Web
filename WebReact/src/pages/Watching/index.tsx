import React, { Fragment, useEffect, useRef, useState } from 'react';
import VideoPlayer, { VideoPlayerHanlde } from '../../components/VideoPlayer';
import styles from './Watching.module.scss';
import { Link } from 'react-router-dom';
import { publicRoutes } from '../../routes';
import clsx from 'clsx';
import Reviews from '../../components/Reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import videos from '../../assets/videos';

function formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
}

function Watching() {
    const [episode, setEpisode] = useState(1);
    const videoPlayerRef = useRef<VideoPlayerHanlde>(null);

    useEffect(() => {
        videoPlayerRef.current?.test();
    }, []);

    return (
        <>
            <section className={styles.wrapper}>
                <div className="container">
                    <div className={styles['video-details']}>
                        <div className={styles['video-player']}>
                            <VideoPlayer videoUrl={videos.sample} ref={videoPlayerRef} />
                        </div>
                        <div className={styles.episodes}>
                            <div className={styles.title}>
                                <h5>Episodes</h5>
                            </div>
                            {Array.from({ length: 24 }).map((_, idx) => (
                                <Fragment key={idx}>
                                    <Link
                                        to={publicRoutes.watching.path}
                                        className={clsx({ [styles.selected]: episode === idx + 1 })}
                                        onClick={() => setEpisode(idx + 1)}
                                    >
                                        {`Ep ${formatNumber(idx + 1)}`}
                                    </Link>
                                    &nbsp;
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className={styles['review-container']}>
                        <Reviews />
                        <div className={styles['review-form']}>
                            <div className={styles['title']}>
                                <h5>Your Comment</h5>
                            </div>
                            <form action="#">
                                <textarea placeholder="Your Comment" />
                                <button type="submit" className={styles['review-btn']}>
                                    <FontAwesomeIcon icon={faLocationArrow} />
                                    Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Watching;

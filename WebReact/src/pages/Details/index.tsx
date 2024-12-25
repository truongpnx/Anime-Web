import React from 'react';
import Reviews from '../../components/Reviews';

import styles from './Details.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faComments, faEye, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { RecommendItem } from '../../components/Recommend';

import images from '../../assets/images';
import Rating from '../../components/Rating';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { publicRoutes } from '../../routes';
import { Link } from 'react-router-dom';

function AnimeDetails({ data }: { data: any }) {
    return (
        <div className={styles['details-text']}>
            <div className={styles['details-title']}>
                <h3>Fate Stay Night: Unlimited Blade</h3>
                <span>フェイト／ステイナイト, Feito/sutei naito</span>
            </div>
            <div className={styles['details-rating']}>
                <Rating numStar={5} point={4.4} style={{ color: '#e89f12' }} />
                <span>1.029 Votes</span>
            </div>
            <p>
                Every human inhabiting the world of Alcia is branded by a “Count” or a number written on their body. For
                Hina's mother, her total drops to 0 and she's pulled into the Abyss, never to be seen again. But her
                mother's last words send Hina on a quest to find a legendary hero from the Waste War - the fabled Ace!
            </p>
            <div className={styles['details-widget']}>
                <div className={styles['widget-col']}>
                    <ul>
                        <li>
                            <span>Type:</span> TV Series
                        </li>
                        <li>
                            <span>Studios:</span> Lerche
                        </li>
                        <li>
                            <span>Date aired:</span> Oct 02, 2019 to ?
                        </li>
                        <li>
                            <span>Status:</span> Airing
                        </li>
                        <li>
                            <span>Genre:</span> Action, Adventure, Fantasy, Magic
                        </li>
                    </ul>
                </div>
                <div className={styles['widget-col']}>
                    <ul>
                        <li>
                            <span>Scores:</span> 7.31 / 1,515
                        </li>
                        <li>
                            <span>Rating:</span> 8.5 / 161 times
                        </li>
                        <li>
                            <span>Duration:</span> 24 min/ep
                        </li>
                        <li>
                            <span>Quality:</span> HD
                        </li>
                        <li>
                            <span>Views:</span> 131,541
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles['details-btn']}>
                <Link to={publicRoutes.details.path} className={styles['follow-btn']}>
                    <FontAwesomeIcon icon={faHeart} />
                    Follow
                </Link>
                &nbsp;
                <Link to={publicRoutes.watching.path} className={styles['watch-btn']}>
                    <span>Watch Now</span>
                    &nbsp;
                    <div>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </Link>
            </div>
        </div>
    );
}

function Details() {
    return (
        <>
            <section className={styles.wrapper}>
                <div className="container">
                    <div className={styles.details}>
                        <div className={styles.poster}>
                            <div className={styles['poster-img']} style={{ backgroundImage: `url(${images.details})` }}>
                                <div className={styles.comment}>
                                    <FontAwesomeIcon icon={faComments} />
                                    11
                                </div>
                                <div className={styles.view}>
                                    <FontAwesomeIcon icon={faEye} />
                                    9141
                                </div>
                            </div>
                        </div>
                        <div className={styles['anime-details-content']}>
                            <AnimeDetails data={'abc'} />
                        </div>
                    </div>

                    <div className={styles['review-container']}>
                        <div className={styles['review-content']}>
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
                        <div className={styles['review-sidebar']}>
                            <div className={styles.title}>
                                <h5>You might like ...</h5>
                            </div>
                            <RecommendItem />
                            <RecommendItem />
                            <RecommendItem />
                            <RecommendItem />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Details;

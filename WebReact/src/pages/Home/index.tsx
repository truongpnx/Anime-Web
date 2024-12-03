import React from 'react';

import styles from './Home.module.scss';
import Hero from '../../components/Hero';
import ProductContainer from '../../components/ProductContainer';
import Recommend from '../../components/Recommend';
import Comment from '../../components/Comment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SimpleProductData } from '../../models/ProductModel';

interface CustomProductContainerProps {
    title: string;
    className?: string;
    data?: SimpleProductData[];
}

function CustomProductContainer(props: CustomProductContainerProps) {
    return (
        <div className={props.className}>
            <div className={styles.top}>
                <div className={styles['title-container']}>
                    <div className={styles.title}>
                        <h4>{props.title}</h4>
                    </div>
                </div>
                <div className={styles['view-container']}>
                    <div className={styles['view-all']}>
                        <Link to="/">
                            View All
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                </div>
            </div>
            <ProductContainer data={props.data} />
        </div>
    );
}

function Home() {
    const dummyData = [
        {
            currentEp: 18,
            maxEp: 18,
            commentNum: 11,
            viewNum: 9141,
            movieName: 'Kizumonogatari III: Reiket su-hen',
            movieClasses: ['Action', 'Movie'],
        },
    ];

    return (
        <>
            <Hero />
            <section className={styles.products}>
                <div className="container">
                    <div className={styles.content}>
                        <div className={styles.main}>
                            <CustomProductContainer
                                className={styles['product-container']}
                                title="Trending Now"
                                data={dummyData}
                            />
                            <CustomProductContainer
                                className={styles['product-container']}
                                title="Popular Shows"
                                data={dummyData}
                            />
                            <CustomProductContainer
                                className={styles['product-container']}
                                title="Recently Added Shows"
                                data={dummyData}
                            />
                            <CustomProductContainer title="Live Action" data={dummyData} />
                        </div>
                        <div className={styles.sub}>
                            <Recommend />
                            <Comment />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

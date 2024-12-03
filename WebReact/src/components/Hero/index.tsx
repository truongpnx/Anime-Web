import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './Hero.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import images from '../../assets/images';
import { Link } from 'react-router-dom';

interface SliderItemProps {
    width: number;
    imageSrc: string;
    active: Boolean;
}

function SliderItem(props: SliderItemProps) {
    return (
        <div
            className={clsx(styles['slider-item'], { [styles['active-item']]: props.active })}
            style={{
                width: `${props.width}px`,
            }}
        >
            <div
                className={styles['slider-img']}
                style={{
                    backgroundImage: `url(${props.imageSrc})`,
                }}
            >
                <div className={styles['slider-detail-container']}>
                    <div className={styles['slider-detail']}>
                        <div className={styles.detail}>
                            <div className={styles.label}>Adventure</div>
                            <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                            <p>After 30 days of travel across the world...</p>
                            <Link to="/">
                                <span>Watch Now</span>
                                &nbsp;
                                <div>
                                    <FontAwesomeIcon icon={faAngleUp} rotation={90} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideWidth, setSildeWidth] = useState(0);
    const totalSlides = 3;
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const updateSlideWidth = () => {
        if (carouselRef.current) {
            const containerWidth = carouselRef.current.getBoundingClientRect().width;
            setSildeWidth(containerWidth);
        }
    };

    useEffect(() => {
        updateSlideWidth();
        window.addEventListener('resize', updateSlideWidth);
        return () => window.removeEventListener('resize', updateSlideWidth);
    }, []);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev + totalSlides - 1) % totalSlides);
    };

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.carousel} ref={carouselRef}>
                    <div
                        className={styles['slider-outer']}
                        style={{
                            overflow: 'hidden',
                            width: `${slideWidth}px`,
                        }}
                    >
                        <div
                            className={styles.slider}
                            style={{
                                transform: `translate3d(-${currentSlide * slideWidth}px, 0, 0)`,
                                transition: 'all',
                                width: `${slideWidth * totalSlides}px`,
                            }}
                        >
                            {[...Array(totalSlides)].map((_, index) => (
                                <SliderItem
                                    key={index}
                                    width={slideWidth}
                                    imageSrc={images.hero}
                                    active={index === currentSlide}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.nav}>
                        <button onClick={goToPrevSlide} className={clsx(styles['nav-btn'], styles['nav-btn-prev'])}>
                            <span>
                                <FontAwesomeIcon icon={faAngleUp} rotation={270} />
                            </span>
                        </button>
                        <button onClick={goToNextSlide} className={clsx(styles['nav-btn'], styles['nav-btn-next'])}>
                            <span>
                                <FontAwesomeIcon icon={faAngleUp} rotation={90} />
                            </span>
                        </button>
                    </div>

                    <div className={styles.dots}>
                        {[...Array(totalSlides)].map((_, index) => (
                            <span
                                key={index}
                                className={index === currentSlide ? styles.activeDot : styles.dot}
                                onClick={() => setCurrentSlide(index)}
                            >
                                •
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

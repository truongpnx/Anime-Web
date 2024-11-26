import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './Hero.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import hero_img from '../../assets/images/hero.jpg';

interface SliderItemProps {
    key: any;
    width: number;
    image_src: string;
}

function SliderItem(props: SliderItemProps) {
    return (
        <div
            key={props.key}
            className={styles['slider-item']}
            style={{
                width: `${props.width}px`,
            }}
        >
            <img src={props.image_src} alt="slider item" />
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
        const interval = setInterval(goToNextSlide, 3000);
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
                                <SliderItem key={index} width={slideWidth} image_src={hero_img} />
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

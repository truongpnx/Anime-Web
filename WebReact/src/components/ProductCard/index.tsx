import React from 'react';

import styles from './ProductCard.module.scss';
import images from '../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SimpleProductData } from '../../models/ProductModel';
import { publicRoutes } from '../../routes';

interface ProductCardProps {
    data: SimpleProductData;
}

function ProductCard({ data }: ProductCardProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.poster} style={{ backgroundImage: `url(${images.hero})` }}>
                <div className={styles.ep}>{`${data.currentEp} / ${data.maxEp ? data.maxEp : '?'}`}</div>
                <div className={styles.comment}>
                    <FontAwesomeIcon icon={faComments} />
                    {data.commentNum}
                </div>
                <div className={styles.view}>
                    <FontAwesomeIcon icon={faEye} />
                    {data.viewNum}
                </div>
            </div>
            <div className={styles.text}>
                <ul>
                    {data.movieClasses.map((e) => (
                        <li key={e}>{e}</li>
                    ))}
                </ul>
                <h5 className={styles.name}>
                    <Link to={publicRoutes.details.path}>{data.movieName}</Link>
                </h5>
            </div>
        </div>
    );
}

export default ProductCard;

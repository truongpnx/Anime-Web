import React, { ReactNode } from 'react';

import styles from './ProductContainer.module.scss';
import ProductCard from '../ProductCard';
import { SimpleProductData } from '../../models/ProductModel';

interface ProductContainerProps {
    data?: SimpleProductData[];
    children?: ReactNode;
}

const defaultProps = {
    data: [],
};

function ProductContainer(props: ProductContainerProps) {
    props = { ...defaultProps, ...props };

    return (
        <div className={styles.wrapper}>
            {props.data?.map((it, idx) => (
                <div key={idx} className={styles.product}>
                    <ProductCard data={it} />
                </div>
            ))}
        </div>
    );
}

export default ProductContainer;

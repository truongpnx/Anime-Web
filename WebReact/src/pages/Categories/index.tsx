import React, { useEffect, useState } from 'react';

import styles from './Categories.module.scss';
import ProductContainer from '../../components/ProductContainer';
import TopView from '../../components/Recommend';
import Comment from '../../components/Comment';
import { publicRoutes } from '../../routes';

import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import LinkBreadcrumb from '../../components/LinkBreadcrumb';

const filterTypes: { [key: string]: string } = {
    topView: 'Top View',
    ascending: 'A-Z',
    descending: 'Z-A',
    recentAdd: 'Recently Add',
};

interface FilterSelectProps {
    value: string;
    onChange?: (value: string) => void;
}

function FilterSelect(props: FilterSelectProps) {
    const [value, setValue] = useState(props.value);
    const [isOpen, setOpen] = useState(false);

    const handleFilterSelect = (value: string) => {
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return (
        <div
            className={clsx(styles['nice-select'], { [styles.open]: isOpen })}
            tabIndex={0}
            onClick={() => setOpen(!isOpen)}
        >
            <span>{filterTypes[value]}</span>
            <ul>
                {Object.entries(filterTypes).map(([key, content]) => (
                    <li
                        key={key}
                        className={clsx(styles.option, {
                            [styles['filter-focus']]: value === key,
                        })}
                        onClick={() => handleFilterSelect(key)}
                    >
                        {content}
                    </li>
                ))}
            </ul>
            <FontAwesomeIcon className={clsx({ [styles.open]: isOpen })} icon={faAngleUp} />
        </div>
    );
}

interface PaginationProps {
    value: number;
    maxNumPage: number;
    onSelect?: (value: number) => void;
}

function Pagination(props: PaginationProps) {
    const [page, setPage] = useState(props.value);

    const handlePageSelect = (value: number) => {
        setPage(value);
        if (props.onSelect) {
            props.onSelect(value);
        }
    };

    const pages = getPages(props.value, props.maxNumPage);

    return (
        <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => handlePageSelect(page > 1 ? page - 1 : 1)}>
                <FontAwesomeIcon icon={faAnglesRight} rotation={180} />
            </button>
            {pages.map((p, idx) =>
                typeof p === 'number' ? (
                    <div
                        key={idx}
                        className={page === p ? styles['page-selected'] : ''}
                        onClick={() => handlePageSelect(p)}
                    >
                        {p}
                    </div>
                ) : (
                    <span key={idx} className={styles.ellipsis}>
                        {p}
                    </span>
                ),
            )}

            <button
                disabled={page === props.maxNumPage}
                onClick={() => handlePageSelect(page < props.maxNumPage ? page + 1 : props.maxNumPage)}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </div>
    );
}

// ChatGPT
const getPages = (currentPage: number, totalPages: number) => {
    const pages = [];
    const range = 1; // Number of pages to show before and after the current page

    // Always show the first few pages
    for (let i = 1; i <= Math.min(4, totalPages); i++) {
        pages.push(i);
    }

    // Add ellipsis if necessary
    if (currentPage > 5) {
        pages.push('...');
    }

    // Add the range of pages around the current page
    for (let i = Math.max(5, currentPage - range); i <= Math.min(totalPages - 4, currentPage + range); i++) {
        pages.push(i);
    }

    // Add ellipsis if necessary
    if (currentPage < totalPages - 5) {
        pages.push('...');
    }

    // Always show the last few pages
    for (let i = Math.max(totalPages - 3, 1); i <= totalPages; i++) {
        if (!pages.includes(i)) pages.push(i);
    }

    return pages;
};

function Categories() {
    let [searchParams] = useSearchParams();
    let movieType = searchParams.get('type');

    const [filter, setFilter] = useState(Object.keys(filterTypes).at(0));
    const [page, setPage] = useState(() => {
        if (!searchParams.get('page')) return 1;

        if (isNaN(parseInt(searchParams.get('page')!!))) return 1;

        return parseInt(searchParams.get('page')!!);
    });

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

    const handleFilterSelect = (value: string) => {
        setFilter(value);
        console.log(value);
    };

    useEffect(() => {
        console.log(`Need to fetch data by ${filter}`);
    }, [filter]);

    return (
        <>
            <LinkBreadcrumb
                current={movieType ? movieType : 'Romance'}
                internalLinks={[{ text: 'Categories', path: publicRoutes.categories.path }]}
            />
            <section className={styles.products}>
                <div className="container">
                    <div className={styles.content}>
                        <div className={styles.main}>
                            <div className={styles.top}>
                                <div className={styles['title-container']}>
                                    <div className={styles.title}>
                                        <h4>{movieType ? movieType : 'Romance'}</h4>
                                    </div>
                                </div>
                                <div className={styles['filter-container']}>
                                    <div className={styles['filter']}>
                                        <p>Order by:</p>
                                        &nbsp;
                                        <FilterSelect
                                            value={filter ? filter : 'topView'}
                                            onChange={handleFilterSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ProductContainer data={dummyData} />
                            <Pagination value={page} maxNumPage={20} onSelect={setPage} />
                        </div>
                        <div className={styles.sub}>
                            <TopView />
                            <Comment />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Categories;

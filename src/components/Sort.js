import React from 'react';
import Button from './Button';

export default function Sort({ sortKey, onSort, activeSortList, children }) {
    const sortClass = ['button-inline'];

    if (sortKey === activeSortList) {
        sortClass.push('button-active');
    }
    return (
        <Button onClick={() => onSort(sortKey)}
            className={sortClass.join(' ')}>
            {children}
        </Button>
    )
}

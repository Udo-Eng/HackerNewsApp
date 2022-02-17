import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const Sort = ({ sortKey, onSort, activeSortList, children }) => {
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

Sort.propTypes = {
    sortKey: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    activeSortList: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}


export default Sort;

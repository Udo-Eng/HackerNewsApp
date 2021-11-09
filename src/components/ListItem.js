import { sortBy } from 'lodash';
import Button from './Button';
import Sort from './Sort';


// import React, { Component } from 'react';
//Function to search through the list values 
// const isSearched = searchTerm => item =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase());

// class ListItem extends Component {

//     render() {
//         const { list, searchTerm, onDismiss } = this.props;
//         return (
//             <div className="listitem">
//                 {
//                     list.filter(isSearched(searchTerm)).map((item) =>
//                         < div key={item.objectID} className="item" >
//                             <span>
//                                 <a href={item.url}>
//                                     {item.title}
//                                 </a>
//                             </span>
//                             <span>{item.author}</span>
//                             <span>{item.num_comments}</span>
//                             <span>{item.points}</span>
//                             <Button onClick={() => onDismiss(item.objectID)
//                             } >
//                                 Dismiss
//                             </Button>
//                         </div>
//                     )
//                 }
//             </div>

//         )
//     }
// }

// export default ListItem;

// Removed the Filtering property
// const isSearched = searchTerm => item =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase());


//Declare a Sorts Object 
const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
}

function ListItems({ list, onDismiss, onSort, sortKey, isSortReverse }) {
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
        ? sortedList.reverse()
        : sortedList;
    return (
        <div className="table">
            <div className="table-header ">
                <span style={{ width: '40%' }}>
                    <Sort
                        sortKey={'TITLE'}
                        onSort={onSort}
                        activeSortList={sortKey}
                    >
                        Title
                    </Sort>
                </span>
                <span
                    style={{ width: '30%' }}
                >
                    <Sort
                        sortKey={'AUTHOR'}
                        onSort={onSort}
                        activeSortList={sortKey}
                    >
                        Author
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'COMMENTS'}
                        onSort={onSort}
                        activeSortList={sortKey}
                    >
                        Comments
                    </Sort>
                </span>
                <span style={{ width: '10%' }}>
                    <Sort
                        sortKey={'POINTS'}
                        onSort={onSort}
                        activeSortList={sortKey}
                    >
                        Points
                    </Sort>
                </span>
                {/* <span style={{ width: '10%' }}> */}
                <button className="button" style={{ width: '10%' }}>
                    Archive
                </button>
                {/* </span> */}
            </div>
            {
                //Removed filtering property .filter(isSearched(searchTerm))
                reverseSortedList.map((item) =>
                    < div key={item.objectID} className="table-row" >
                        <span
                            style={{ width: '40%' }}
                        >
                            <a href={item.url}>
                                {item.title}
                            </a>
                        </span >
                        <span
                            style={{ width: '30%' }}
                        >
                            {item.author}
                        </span>
                        <span
                            style={{ width: '10%' }}>
                            {item.num_comments}
                        </span>
                        <span style={{ width: '10%' }}>
                            {item.points}
                        </span>
                        <Button onClick={() => onDismiss(item.objectID)
                        }
                            className="button-inline"
                        >
                            Dismiss
                        </Button>
                    </div>
                )
            }
        </div >

    )
}


export default ListItems;
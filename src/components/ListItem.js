import Button from './Button';


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

function ListItem({ list, onDismiss }) {
    return (
        <div className="table">
            {
                //Removed filtering property .filter(isSearched(searchTerm))
                list.map((item) =>
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
        </div>

    )
}


export default ListItem;
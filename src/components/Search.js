import Button from './Button';
// import React, { Component } from 'react';



//Class Declaration using react 
// class Search extends Component {

//     render() {

//         //Destructuring the properties passed from the Appp component
//         //the children is used to obtain any element passed from the parent CComponent 
//         const { searchTerm, onChange, children } = this.props;
//         return (
//             <div>
//                 {children} <form>
//                     <input type="text"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={onChange}
//                     />
//                 </form>
//             </div>
//         )
//     }
// }
// export default Search;


//Refactoring to functional Stateless components 

const Search = ({ searchTerm, onChange, onSubmit, children }) =>
//The props is passed via the Function signature 

(
    <div className="header">
        <form onSubmit={onSubmit} >
            <input type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={onChange}
            />
            <Button type="submit">{children}</Button>
        </form>

    </div>
)



export default Search;
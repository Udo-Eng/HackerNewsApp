import React, { Component } from 'react';



// Class Declaration using react 
class Search extends Component {

    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }


    render() {
        //Destructuring the properties passed from the App component
        const { searchTerm, onChange, onSubmit, children } = this.props;

        //the children is used to obtain any element passed from the parent CComponent 
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={onChange}
                        ref={el => this.input = el}
                    />
                    <button className="btn">{children}</button>
                </form>
            </div>
        )
    }
}

export default Search;


//Refactoring to functional Stateless components 

// const Search = ({ searchTerm, onChange, onSubmit, children }) =>
// //The props is passed via the Function signature 

// (
//     <div className="header">
//         <form onSubmit={onSubmit}>
//             <input type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={onChange}
//             />
//             {/* 
//             bug fixed i used the imported Button component instead of the regular button element
//             Thank God i fixed this bug ha ha ha 
//             */}


//             <button type="submit">{children}</button>
//         </form>

//     </div>
// )

// export default Search;
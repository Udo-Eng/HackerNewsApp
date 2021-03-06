import PropTypes from 'prop-types';

function Button({ onClick, children }) {
    return (
        <span className="btn">
            <button type="button"
                onClick={onClick}
            >
                {children}
            </button>
        </span>

    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Button;


//Refactoring the Button Class component to a functional state component 

// import React, { Component } from 'react';
// export default class Button extends Component {
//     render() {
//         const { onClick, children } = this.props;
//         return (
//             <span className="btn">
//                 <button type="button"
//                     onClick={onClick}
//                 >
//                     {children}
//                 </button>
//             </span>

//         )
//     }
// }

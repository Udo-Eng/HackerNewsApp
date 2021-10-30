import './App.css';
import React, { Component } from 'react';
import Search from './components/Search';
import ListItem from './components/ListItem';


const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'My Coding Journey',
    url: 'https://www.grammarly.com/',
    author: 'Udochukwu Abazie',
    num_comments: 2,
    points: 7,
    objectID: 2,
  },
  {
    title: 'JavaScript and BlockChain Development',
    url: 'http://localhost:3000/',
    author: 'Udochukwu Abazie',
    num_comments: 2,
    points: 7,
    objectID: 3,
  },
  ,
  {
    title: 'Learning App development',
    url: 'https://www.google.com/search?q=Learning+Block+Chain+Devlopment+with+Soilidity&oq=Learning+Block+Chain+Devlopment+with+Soilidity+&aqs=chrome..69i57j0i13j0i22i30l2.15275j0j7&sourceid=chrome&ie=UTF-8',
    author: 'Otitodirchukwu',
    num_comments: 2,
    points: 7,
    objectID: 4,
  },
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    }
    //Binding the onDismiss Method to the class instance 
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }


  //onDismiss function 
  onDismiss(id) {
    //Function to perform Filtering  an example of Higher order Functions 
    function isNotId(item) {
      return item.objectID !== id;
    }
    // Filter and Update the List 
    let UpDatedList = this.state.list.filter(isNotId);
    this.setState({
      list: UpDatedList,
    });
  }


  // onSearchChange Function
  onSearchChange(event) {
    return this.setState({ searchTerm: event.target.value });
  }



  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>

        <ListItem
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    )
  }
}


export default App;

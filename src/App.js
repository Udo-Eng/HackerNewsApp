import './App.css';
import React, { Component } from 'react';
import Search from './components/Search';
import ListItem from './components/ListItem';


//The request url constant and Default parameters
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const NUM_PAGES = `&hitsPerPage=50`;


// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
//   {
//     title: 'My Coding Journey',
//     url: 'https://www.grammarly.com/',
//     author: 'Udochukwu Abazie',
//     num_comments: 2,
//     points: 7,
//     objectID: 2,
//   },
//   {
//     title: 'JavaScript and BlockChain Development',
//     url: 'http://localhost:3000/',
//     author: 'Udochukwu Abazie',
//     num_comments: 2,
//     points: 7,
//     objectID: 3,
//   },
//   ,
//   {
//     title: 'Learning App development',
//     url: 'https://www.google.com/search?q=Learning+Block+Chain+Devlopment+with+Soilidity&oq=Learning+Block+Chain+Devlopment+with+Soilidity+&aqs=chrome..69i57j0i13j0i22i30l2.15275j0j7&sourceid=chrome&ie=UTF-8',
//     author: 'Otitodirchukwu',
//     num_comments: 2,
//     points: 7,
//     objectID: 4,
//   },
// ];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
    //Binding the user defined methods to the  class instance 
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({
      result
    })
  }

  //onDismiss function 
  onDismiss(id) {
    //Function to perform Filtering  an example of Higher order Functions 
    function isNotId(item) {
      return item.objectID !== id;
    }
    // Filter and Update the List 
    let UpDatedList = this.state.result.hits.filter(isNotId);
    this.setState({
      //New Object.assign() method takes the target Object and then the 
      result: Object.assign({}, this.state.result, { hits: UpDatedList })
    });

  }


  // onSearchChange Function
  onSearchChange(event) {
    return this.setState({ searchTerm: event.target.value });
  }


  //Function definition for search stories 
  fetchSearchTopStories(searchTerm) {

    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}${NUM_PAGES}`, {
      mode: 'no-cors',
    })
      .then(response => response.json())
      //Bug experienced value of function was  setSearchTopStoriesdata so the result state was never set :)
      //JavaScript is funny 
      .then((result) => this.setSearchTopStories(result)
      ).catch(error => {
        console.log(error.message);
      })
  }


  onSubmitSearch(event) {
    const { searchTerm } = this.state;

    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  //The Life cycle method componentDidMount()
  componentDidMount() {
    const { searchTerm } = this.state;
    //Function to fetch the serach stories 
    this.fetchSearchTopStories(searchTerm);
  }

  //The Life cycle method render()
  render() {
    const { result, searchTerm } = this.state;

    //Conditional to return null if resultis null;
    // if (!result) { return null; };Deprecated 
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSubmitSearch}
          >
            Search
          </Search>
        </div>
        {
          //Using ternary operator to render the Table value 

          result ?
            <ListItem
              list={result.hits}
              // searchTerm={searchTerm}
              onDismiss={this.onDismiss}
            /> : null
        }

      </div>
    )
  }
}


export default App;

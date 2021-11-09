import './App.css';
import React, { Component } from 'react';
import Search from './components/Search';
import ListItems from './components/ListItem';
import Button from './components/Button';


//The request url constant and Default parameters
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const NUM_PAGES = `&hitsPerPage=50`;
const PARAM_PAGE = 'page='


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
    // this.state = {
    //   result: null,
    //   searchTerm: DEFAULT_QUERY,
    // }
    //Implementing client side caching with react setState
    this.state = {
      results: null,
      SearchKey: '',
      searchTerm: DEFAULT_QUERY,
      //Error state used to handle errors 
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    }
    //Binding the user defined methods to the  class instance 
    this.onSort = this.onSort.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({
      sortKey, isSortReverse
    })
  }
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    //Cascading the old and new pages together 

    const { hits, page } = result;

    // const oldHits = page !== 0 ? this.state.result.hits : [];

    // Client side caching using the searchKey property 
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const UpDatedHits = [...oldHits, ...hits]

    this.setState({
      results: {
        ...results, [searchKey]: { hits: UpDatedHits, page }
      },
      isLoading: false
    })
  }

  //onDismiss function 
  // complete Refactoring of the onDismiss callback 
  // //Function to perform Filtering  an example of Higher order Functions 
  // function isNotId(item) {
  //   return item.objectID !== id;
  // }
  // // Filter and Update the List 
  // let UpDatedList = this.state.result.hits.filter(isNotId);
  // this.setState({
  //   //New Object.assign() method takes the target Object and then the 
  //   // Object.assign({}, this.state.result, { hits: UpDatedList }
  //   result: { ...this.state, hits: UpDatedList }
  // });

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    // const isNotId = item => item.objectId !== id;
    function isNotId(item) {
      //Bug  found i did not get the right variable name i 
      // wrote item.objectId instead of Item.objectID
      return item.objectID !== id;
    }


    const UpDatedHits = hits.filter(isNotId);

    this.setState({
      results: { ...results, [searchKey]: { hits: UpDatedHits, page } }
    });

  }


  //Copied onDismiss Function 
  // onDismiss(id) {
  //   const { searchKey, results } = this.state;
  //   const { hits, page } = results[searchKey];
  //   const isNotId = item => item.objectID !== id;
  //   const updatedHits = hits.filter(isNotId);
  //   this.setState({
  //     results: {
  //       ...results,
  //       [searchKey]: { hits: updatedHits, page }
  //     }
  //   })
  // }

  // onSearchChange Function
  onSearchChange(event) {
    return this.setState({ searchTerm: event.target.value });
  }


  //Function definition for search stories 
  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({
      isLoading: true,
    })
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}${NUM_PAGES}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      //Bug experienced value of function was  setSearchTopStoriesdata so the result state was never set :)
      //JavaScript is funny 
      .then((result) => this.setSearchTopStories(result))
      //Ensure you handle your errors it is very important 

      .catch(error => {
        console.log(error.message);
        this.setState({
          error
        })
      })
  }


  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    //Setting the value of searchKey
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories()) {
      this.fetchSearchTopStories(searchTerm);

    }

    event.preventDefault();
  }

  //The Life cycle method componentDidMount()
  componentDidMount() {
    const { searchTerm } = this.state;

    //Setting the value of searchKey
    this.setState({ searchKey: searchTerm });

    //Function to fetch the serach stories 
    this.fetchSearchTopStories(searchTerm);

  }

  //The Life cycle method render()
  render() {
    // const { result, searchTerm } = this.state;

    const { results, searchTerm, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;

    const page = (results
      && results[searchKey]
      && results[searchKey].page)
      || 0;


    //the list value 

    const list = (results
      && results[searchKey]
      && results[searchKey].hits)
      || [];

    //Conditional statement to render the error message
    // if (error) {
    //   return <p>SomeThing went wrong please try again </p>
    // }


    //Conditional to return null if result is null;
    // i now have a results object with a list of Objects 
    // if (!result) { return null; };
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {
          //Using ternary operator to render the Table value 
          // WE can remove the conditional rendering of the Page 
          // results ?
          //   <ListItem
          //     // list={result.hits}
          //     //Refactoring the code to pass in the new list 
          //     list={list}
          //     // searchTerm={searchTerm}
          //     onDismiss={this.onDismiss}
          //   /> : null

          error ? <div className="interactions">
            <p>Something went wrong.</p>
          </div> :
            <ListItems
              // list={result.hits}
              list={list}
              // searchTerm={searchTerm}
              onDismiss={this.onDismiss}
              sortKey={sortKey}
              onSort={this.onSort}
              isSortReverse={isSortReverse}
            />
        }
        {
          isLoading ? <Loading /> :
            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} >More News</Button>
        }
      </div>
    )
  }
}


//Loading in React 
// Describe a reuseable Loading element 
const Loading = () => <div className="button">Loading ....</div>

//A sample Higher Order Component HOC 
//It is a convention to prefix HOC with with
function withFeature(Component) {
  return function (props) {
    return <Component {...props} />;
  }
}

// //HOC to implement conditional rendering 
// const withLoading = (Component) => ({ isLoading, ...rest }) =>
//   isLoading
//     ? <Loading />
//     : <Component {...rest} />

// // Calling the HOC and assigning the returned value to ButtonWith Loading 
// const ButtonWithLoading = withLoading(Button);


// //Implementing the ButtonWithLoading components as a conditional rendered view 
// <ButtonWithLoading
//   isLoading={isLoading}
//   onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
// >
//   More
// </ButtonWithLoading>

export default App;

//export the imported components 
export {
  Button,
  Search,
  ListItems,
  withFeature,
};
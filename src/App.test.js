// import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App, { Search, Button, ListItems } from './App';
// Utility library for jest in React 
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


//Configuration for Enzyme 
Enzyme.configure({ adapter: new Adapter() });

// Snapshot tests usually stay pretty basic.You only want to make sure the component doesn’t change
// its output.Once it does, you have to decide if you accept the changes, otherwise you have to fix the
// component.
// this is the begining of snapshot test 


//Describe test suite for App 
describe('App Testing ', () => {


  //It is used to describe a function block to test a block of functionallity
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Has a valid snapshot ', () => {
    const component = renderer.create(<App />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

})



//Describe test suite   Search
describe('Search Testing  ', () => {

  //It is used to describe a function block to test a block of functionallity
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('Has a valid snapshot ', () => {
    const component = renderer.create(<Search>Search</Search>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

})


//Button testing Suite 
describe('Button Testing', () => {
  //It testing function 
  it('it renders without crashing ', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Button>Add More </Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  // Snapshot testing with jest and react-test-renderer  Utility function 
  test('Has valid snapshot', () => {
    const component = renderer.create(<Button>Add More </Button>);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})



// ListItem testing Suite
describe('ListItem Testing', () => {

  //Creating the props to be passed into the ListItem Components 

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    sortKey: 'TITLE',
    isSortReverse: false,
  };

  //It testing function 
  it('it renders without crashing ', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ListItems {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  test('Has valid snapshot', () => {
    const component = renderer.create(<ListItems {...props} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  //Using shallow and enzyme to assert that the ListItem  has two items

  it('ListItems contains Two items ', () => {

    // Enzyme uses other rendering methods namely 
    // render()
    // mount()

    const element = shallow(<ListItems{...props} />);

    //Test section 
    expect(element.find('.table-row').length).toBe(2);
  })
})
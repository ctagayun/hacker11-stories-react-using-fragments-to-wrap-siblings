/*================================================================
 React Fragments
   https://courses.robinwieruch.de/p/the-road-to-learn-react

   1.  Add a top level tag otherwise the label and input
     elements could not be returned side-by-side without 
     a wrapping top level element
     <div> 
        <label htmlFor="search">Search: </label>
        <input ..../>
     </div>

   2. Another way to return siblings side-by-side is using
     React.Fragment 
  
     <React.Fragment>
      <label htmlFor="search">Search: </label>
      <input id="search" .... />
      </React.Fragment>
  
   3. Another way is to is to use <>
=============================================*/

import * as React from 'react';
 
  //Create a custom hook called "useStorageState". We will use two hooks 
  //to create it:
  //    1. useState
  //    2. useEffect 
  //So far this custom hook is just function around useState and useEffect.
  //What's missing is providing an initial state and returning the values
  //that are needed by the App component as an array.
  
  const useStorageState = (key, initialState) => {
     const [value, setValue] = React.useState(
        localStorage.getItem('key') || initialState //<-- this simply provides 
                             //an initial value to the hook. It will be the value 
                             //in localstorage or value of the parameter 
                             //'initialState'.
        //Note: to make it generic an resusable change 'search' to 'value'
        // localStorage.getItem('search') || initialState  
        //and change "setSearhTerm" to 'setValue' and 'searchTerm' to 'value'

     );

     //What does useEffect do? by using this hook you tell React that 
     //your component needs to do something after a render.
     //useEffect is a Hook, so you can only call it at the top level 
     //of your component or your own Hooks. You can’t call it inside 
     //loops or conditions. 
     //https://react.dev/reference/react/useEffect#useeffect
     React.useEffect(() => {
        console.log('Typed something into textbox. useEffect fired. ' +
         ' Dependency Array= ' + [value, key]); //experiment with hook dependency array 
        //look for an item in the localStorage with the key of 'search/value' 
        //and set its value to 'searchTerm/value' state
        //Study: https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
        // localStorage.setItem(key, value);
        },
        [value, key] // [value]); //<-- React.useEffect is triggered when 
                //when this dependency variable changes. In our
                //case when a user types into the HTML input field)
        ); //EOF useEffect

        //Again to make it reusable, change 
        //localStorage.setItem('search', searchTerm), [searchTerm]; to'value'
        

     //And second, the returned values are returned as an array.
     //change [searchTerm, setSearchTerm] -->[value, value]
     return [value, setValue]; 

  } //EOF create custom hook
  
  
 // Eliminate "return" statement and enclosing bracket if no business 
 //business logic. Otherwise retain the {} and put a "return" statement
 const App = () => { 
     
      const stories = [
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
       ]

       //  This is the custom hook. We used to two hooks we already
       //know to create a custom hook.
       // Under the hood, we want that this custom hook synchronizes the 
       //state with the browser's local storage
      const [searchTerm, setSearchTerm] = 
               useStorageState('search', 'React');
         
      const handleSearch = (event) => {
          setSearchTerm(event.target.value); 
        };

      const searchedStories = stories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <> 
          <h1>My Hacker Stories</h1>
    
          <Search search={searchTerm} onSearch={handleSearch} />
    
          <hr />
    
          <List list={searchedStories} />
        </>
      );
    }

    //Note: Omit the function body (e.g no return statement)
    const Search = ({search, onSearch}) => ( //<--Destructrure the props right inside the function signature
     //add a top level tag otherwise the label and input
     //elements could not be returned side-by-side without 
     //a wrapping top level element
     <div> 
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={onSearch}
         />
      </div>
      )   //EOF Search component  
  
   //Omit the function's block body of the component again.
   const List = ({list}) => (  //<-- destructure objects in the function signature.
    <ul>
       {list.map((item) => (
         <Item key={item.objectID} item={item} />
       ))}
    </ul>
  ); //EOF
     
 
  //This component called "Item" encapsulates the task of displaying 
  //each stories' record
  const Item = ({item}) => (   
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  );   

    
export default App;

//========================================================== 
//Note on Map:
 //Within the map() method, we have access to each object and its properties.
 
 //useState
 //By using useState, we are telling React that we want to have a 
 //stateful value which changes over time. And whenever this stateful value 
 //changes, the affected components (here: Search component) 
 //will re-render to use it (here: to display the recent value).
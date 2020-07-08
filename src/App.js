import React from "react";
import CounterSection from "./components/CounterSection/CounterSection";
import PersonsSection from "./components/PersonsSection/PersonsSection";
import "./globalStyles/styles.css";

/*

//1 create a function that corrects all hobbies
 into the same naming convention This can be any naming convention of your chose
 camelCase, snake_casing or PascalCasing
 This should be placed into a lifecycle hook, so the data is filtered, 
 when the component mounts/loads


//2 create a function/component, that displays only persons, with unqieu hobbies
  

//3 extend on the functionality insisde the source code
  use the useReducer hook, to create the following functionalities. 
  - increase the counter to the nearest unequal number
  - decreae  the counter to the nearest prime number
  - increase the counter using the fibonacci number sequence


//4 create some styling for the components/projects you have made so far
 you can use external libraries like styled-components, material-ui or similar
*/

export default function App() {
  return (
    <div className="App">
      <CounterSection />
      <PersonsSection  />
    </div>
  );
}

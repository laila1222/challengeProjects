import React, { useState, useReducer, useEffect } from "react";
import "./styles.css";
import { findByAltText } from "@testing-library/react";

const data = [
  {
    name: "Jens",
    age: 24,
    hobbies: ["fishing", "sport", "television"],
  },
  {
    name: "Hans",
    age: 24,
    hobbies: ["MMA", "basketball", "Shopping"],
  },
  {
    name: "Erik",
    age: 24,
    hobbies: ["Muay Thai", "c#", "Netflix"],
  },
  {
    name: "Kim",
    age: 24,
    hobbies: ["fishing"],
  },
  {
    name: "Kasper",
    age: 24,
    work: "Engineer",
  },
  {
    name: "Nikolaj",
    age: 24,
    hobbies: ["programming", "react", "angular"],
  },
  {
    name: "Stine",
    age: 24,
    hobbies: ["running", "shopping"],
  },
  {
    name: "Hanne",
    age: 24,
    hobbies: ["boxing", "shopping", "climpping the mountains"],
  },
];

// Same naming convention
const applyConvention = (data) => {
  const modifiedHobbies = data.map((person) => {
    let lowerCaseHobbies;
    // Check if person has hobbies
    if (person.hobbies) {
      lowerCaseHobbies = person.hobbies.map((hobby) => {
        // In case there are more words in a hobby
        if (hobby.includes(" ")) {
          const joinedHobby = hobby
            .split(" ")
            .map((word, index) => {
              // Lowercase all characters in the first word
              if (index === 0) {
                return word.toLowerCase();
              }
              // Capitalize second (or third, etc.) word, and join the words
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join("");
          return joinedHobby;
        } else {
          // Turn all hobbies into lowercase that only contains one word
          return hobby.toLowerCase();
        }
      });
      person.hobbies = lowerCaseHobbies;
    }
  });
  return data;
};

const findUniquePersons = (data) => {
  // Remove people with no hobbies
  const peopleWithHobbies = data.filter((person) => person.hobbies);

  const uniquePerson = peopleWithHobbies.filter((person, index) => {
    // Remove the current person from the persons array
    peopleWithHobbies.splice(index, 1);

    // Hobbies of the current person
    const currentPersonsHobbies = person.hobbies;

    // Hobbies of all other persons
    const allOtherHobbies = peopleWithHobbies.map((person) => person.hobbies);
    const allOtherHobbiesMerged = [].concat.apply([], allOtherHobbies);

    // Find unique hobbies
    const uniqueHobbies = currentPersonsHobbies.filter(
      (hobby) => !allOtherHobbiesMerged.includes(hobby)
    );

    // Return if one only has unique hobbies
    if (currentPersonsHobbies.length === uniqueHobbies.length) {
      return person;
    }
  });
  return uniquePerson;
};

const peopleWithUniqueHObbies = findUniquePersons(data);
console.log(peopleWithUniqueHObbies);
console.log(findUniquePersons(data));
/*

//1 create a function that corrects all hobbies
 into the same naming convention This can be any naming convention of your chose
 camelCase, snake_casing or PascalCasing
 This should be placed into a lifecycle hook, so the data is filtered, 
 when the component mounts/loads
 done





//2 create a function/component, that displays only persons, with unqieu hobbies
  

//3 extend on the functionality insisde the source code
  use the useReducer hook, to create the following functionalities. 
  - increase the counter to the nearest unequal number
  - decreae  the counter to the nearest prime number
  - increase the counter using the fibonacci number sequence


//4 create some styling for the components/projects you have made so far
 you can use external libraries like styled-components, material-ui or similar
*/

const incrementToUneven = (currentCount) => {
  // If current count is even
  if (currentCount % 2 === 0) {
    return currentCount + 1;
  } else {
    // Current count is uneven or zero
    return currentCount + 2;
  }
};

// Have to set error message if current count is 1 or below 1
const decreaseToNextPrime = (currentCount) => {
  // let nextNumber = currentCount - 1;
  for (let nextNumber = currentCount - 1; nextNumber > 1; nextNumber--) {
    if (isPrime(nextNumber)) {
      return nextNumber;
    }
  }
  return currentCount;
};

// Check if number is prime
const isPrime = (number) => {
  if (number <= 1) {
    return false;
  } else if (number === 2) {
    return true;
  } else {
    for (let x = 2; x < number; x++) {
      if (number % x === 0) {
        return false;
      }
    }
    return true;
  }
};

// Give the closest higher Fibonacci number
const incrementToFibonacci = (currentNumber) => {
  // Base of the sequence
  let fibonacciSequence = [0, 1];
  // Building the sequence
  for (let i = 0; i < currentNumber + 1; i++) {
    fibonacciSequence.push(fibonacciSequence[i] + fibonacciSequence[i + 1]);
  }
  // If current number is a Fibonacci one, return the next Fib.number
  if (fibonacciSequence.indexOf(currentNumber) > -1) {
    const indexOfFibNumber = fibonacciSequence.indexOf(currentNumber);
    return fibonacciSequence[indexOfFibNumber + 1];
  } else {
    // Getting the closest higher number in the sequence
    const getClosest = () => {
      for (let i = 0; i < fibonacciSequence.length; i++) {
        if (fibonacciSequence[i] > currentNumber) {
          return fibonacciSequence[i];
        }
      }
    };

    return getClosest();
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "incrementUneven":
      return { count: incrementToUneven(state.count) };
    case "decrement":
      return { count: state.count - 1 };
    case "decreaseToPrime":
      return { count: decreaseToNextPrime(state.count) };
    case "incrementFibonacci":
      return { count: incrementToFibonacci(state.count) };
    default:
      throw new Error("No valid selection was used");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  useEffect(() => {
    // Use naming convention for hobbies
    const filteredData = applyConvention(data);
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>count {state.count} </p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Increment{" "}
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement{" "}
      </button>
      <button onClick={() => dispatch({ type: "incrementUneven" })}>
        Increment to next uneven{" "}
      </button>
      <button onClick={() => dispatch({ type: "decreaseToPrime" })}>
        Decrease to next prime number{" "}
      </button>
      <button onClick={() => dispatch({ type: "incrementFibonacci" })}>
        Increase to next Fibonacci{" "}
      </button>
    </div>
  );
}

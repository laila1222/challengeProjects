import React, { useReducer } from "react";
import Button from "../Button/Button";
import "./CounterSection.scss";

// Increments to next uneven number
const incrementToUneven = (currentCount) => {
  // If current count is even
  if (currentCount % 2 === 0) {
    return currentCount + 1;
  } else {
    // Current count is uneven or zero
    return currentCount + 2;
  }
};

// Decreases counter to next prime number if counter is bigger than 1
const decreaseToNextPrime = (currentCount) => {
  for (let nextNumber = currentCount - 1; nextNumber > 1; nextNumber--) {
    if (isPrime(nextNumber)) {
      return nextNumber;
    }
  }
  return currentCount;
};

// Check if a number is prime
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
  if (currentNumber === 1) {
    return 2;
  } else {
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

const CounterSection = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="counter">
      <div className="counter__content-container">
        <div className="counter__display">
          <h2 className="counter__display__title">Counter</h2>
          <p className="counter__display__number">{state.count} </p>
        </div>

        <div className="counter__buttons">
          <Button
            onClickAction={() => dispatch({ type: "increment" })}
            title="Increment"
            className="counter__button"
          />
          <Button
            onClickAction={() => dispatch({ type: "decrement" })}
            title="Decrement"
            className="counter__button"
          />
          <Button
            onClickAction={() => dispatch({ type: "incrementUneven" })}
            title="Increment to next uneven"
            className="counter__button"
          />
          <Button
            onClickAction={() => dispatch({ type: "decreaseToPrime" })}
            title="Decrease to next prime number"
            className="counter__button"
          />
          <Button
            onClickAction={() => dispatch({ type: "incrementFibonacci" })}
            title="Increase to next Fibonacci"
            className="counter__button"
          />
        </div>
      </div>
      <a href="#persons-section" className="counter__down-arrow">
        &darr;
      </a>
    </div>
  );
};

export default CounterSection;

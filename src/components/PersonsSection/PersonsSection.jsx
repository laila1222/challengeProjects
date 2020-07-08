import React, { useState, useEffect } from "react";
import Person from "../Person/Person";
import "./PersonsSection.scss";

const originalData = [
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
    hobbies: ["boxing", "shopping"],
  },
];

// Camelcase naming convention
const applyConvention = (data) => {
  const modifyHobbies = () =>
    data.map((person) => {
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
                return (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
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
  modifyHobbies();
  return data;
};

// Find people with only unique hobbies
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

const PersonsSection = () => {
  const [data, setData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  //   Naming convention is applied once
  useEffect(() => {
    setData(applyConvention(originalData));
  }, []);

  //   User clicked 'Show people with unique hobbies' button
  const uniqueHobbiesClicked = () => {
    // 'All people' button appears
    setIsFiltered(true);
    setData(findUniquePersons(data));
  };

  //   User clicked 'Show all people' button
  const allPeopleClicked = () => {
    setIsFiltered(false);
    setData(applyConvention(originalData));
  };

  return (
    <div className="persons" id="persons-section">
      <h2 className="persons__title">List of people</h2>
      <div className="persons__button-container">
        {!isFiltered && (
          <button
            className="persons__button"
            onClick={() => uniqueHobbiesClicked()}
          >
            Show people with only unique hobbies
          </button>
        )}
        {isFiltered && (
          <button
            className="persons__button"
            onClick={() => allPeopleClicked()}
          >
            Show all people
          </button>
        )}
      </div>

      <div className="persons__container">
        {data.map((person) => {
          console.log(person);
          return <Person person={person} />;
        })}
      </div>
    </div>
  );
};

export default PersonsSection;

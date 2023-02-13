import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numOfGuessesLeft: 10,
      // Insert form input state here
      input: "",
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (
        this.state.guessedLetters.includes(letter) ||
        this.state.numOfGuessesLeft === 0
      ) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // prevent default refresh on the page when click on submit
    event.preventDefault();
    // input submitted by the user is saved. Only the first letter and letter must be in lower case.
    const inputLetter = this.state.input[0].toLowerCase();

    // After the submission, the state will be updated from the previous state in handlechange
    this.setState((state) => ({
      // spread operator will render all the existing data in guessedLetters array and add in inputLetter.
      guessedLetters: [...state.guessedLetters, inputLetter],
      // num of guesses left will not change if the input letter is matched with currWord, else num of guesses left will -1
      numOfGuessesLeft: this.state.currWord.includes(inputLetter)
        ? this.state.numOfGuessesLeft
        : this.state.numOfGuessesLeft - 1,
      // input will be reset as the previous input already saved in guessedLetters
      input: "",
    }));
  };

  // check if the user guessed the word
  didUserGuessTheWord = (inputLetter) => {
    const userInputLetters = [...this.state.guessedLetters, inputLetter];
    for (let letter of this.state.currWord) {
      // if letter of userinput includes letter of currWord, return true
      if (!userInputLetters.includes(letter)) {
        return false;
      }
      return true;
    }
  };

  // reset the game via resetting all the value in state
  resetGame = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numOfGuessesLeft: 10,
      input: "",
    });
  };

  render() {
    // check if the user guessed the word
    const userGuessedTheWord = this.didUserGuessTheWord();

    // after guessing the correct word, reset the game and play again
    const playAgain = <button onClick={this.resetGame}>Play Again</button>;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "_"}
          <h3>Num of Guesses Left: {this.state.numOfGuessesLeft}</h3>

          <h3>Input</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="input"
              placeholder="Input A Letter"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <input type="submit" name="submit" />
          </form>

          {/* if user guessed the word */}
          {userGuessedTheWord && (
            <div>
              <p>Congrats! You got the word!</p>
              {playAgain}
            </div>
          )}

          {/* if the user has no more guesses left, the game should stop and tell the user lost message and play again */}

          {this.state.numOfGuessesLeft === 0 && !userGuessedTheWord && (
            <div>
              <p>Good try! You ran out of guesses.</p>
              Try again! {playAgain}
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;

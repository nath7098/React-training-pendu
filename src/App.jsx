import './App.css';
import { Component } from 'react';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const PHRASES = [
  'BONJOUR',
  'CHAT',
  'DEVELOPPEMENT',
  'CARAMEL',
  'PARADOXAL'
];

class App extends Component {

  state = {
    score: 0,
    phrase: this.pickRandomPhrase(),
    usedLetters: [],
    goodLetters: [],
    won: false
  }

  pickRandomPhrase() {
    return PHRASES[Math.floor(Math.random() * PHRASES.length)];
  }

  revealLetter(letter) {
    const { score, usedLetters, goodLetters } = this.state;
    this.setState({ usedLetters: [...usedLetters, ...[letter]], goodLetters: [...goodLetters, ...[letter]], score: score + 2 });
    document.getElementById(letter).className += ' good';
  }

  handleWrongLetter(letter) {
    const { usedLetters, score } = this.state;
    this.setState({ usedLetters: [...usedLetters, ...[letter]], score: score - 1 });
    document.getElementById(letter).className += ' wrong';
  }

  checkLetter(letter) {
    const { phrase, usedLetters } = this.state;

    if (!usedLetters.includes(letter)) {
      if (phrase.includes(letter)) {
        this.revealLetter(letter);
      } else {
        this.handleWrongLetter(letter);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="score">
          <h2>{`Score = ${this.state.score}`}</h2>
        </div>
        <div className="wordToGuess">
          <h1 className="word">{computeDisplay(this.state.phrase, this.state.usedLetters)}</h1>
        </div>
        <div className="letters">
          {LETTERS.map((letter, index) => (
            <button id={letter} disabled={this.state.usedLetters.includes(letter)} className="letter" onClick={() => this.checkLetter(letter)} key={letter}>{letter}</button>
          ))}
        </div>
      </div>
    );
  }
}


// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).
function computeDisplay(phrase, usedLetters) {
  return phrase.replace(/\w/g, (letter) => (
    usedLetters.includes(letter) ? letter : '_'
  ));
}

export default App;

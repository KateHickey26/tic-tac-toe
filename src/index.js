import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 3 React components, Square, Board, Game

// child component of Board
// renders a single <button> square for the board
class Square extends React.Component {
    // constructor to initialize the state.
    // state is used so the square can 'remember' it's been clicked.
    constructor(props){
        // in JS classes, need to always call 'super' when defining the constructor of a subclass.
        super(props); // all React constructors should start with this.
        this.state = {
            value: null,
        };
    }

    render() { // method
      return (
          // adding the onClick action for the board square
          // can have a console log in here, that will log to browser dev console when square is clicked
        <button 
            className="square" 
            /* Calling 'this.setState' here tells React to re-render the square when the button is clicked. Will set the square to X. When you call setState in a component, React automatically updates the child components inside of it too. */
            onClick={() => this.setState({value: 'X'})}>
         {/* receiving the value from Board. (replaced this.props.value with this.state.value so the square could remember it had been clicked) */}
          {this.state.value} 
        </button>
      );
    }
}
  
// Parent component of Square
// renders the 9 squares
class Board extends React.Component {
    renderSquare(i) {
        // passes the value to Square
      return <Square value={i} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
// renders a board with placeholder values
class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
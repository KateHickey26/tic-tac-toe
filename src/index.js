import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Started with 3 React components, Square, Board, and Game.
// Changed Square to be a 'function component'.

// // REPLACED 
// // child component of Board
// // renders a single <button> square for the board
// class Square extends React.Component {
//     // // constructor to initialize the state.
//     // // this was removed later as the Board keeps track of the state instead.
//     // // state is used so the square can 'remember' it's been clicked.
//     // constructor(props){
//     //     // in JS classes, need to always call 'super' when defining the constructor of a subclass.
//     //     super(props); // all React constructors should start with this.
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }

//     render() { // method
//       return (
//           // adding the onClick action for the board square
//           // can have a console log in here, that will log to browser dev console when square is clicked
//         <button 
//             className="square" 
//             /* Calling 'this.setState' here tells React to re-render the square when the button is clicked. Will set the square to X. When you call setState in a component, React automatically updates the child components inside of it too. Then switched this out to instead call a function, passed down from parent component Board, when clicked. */
//                 // onClick={() => this.setState({value: 'X'})}> old version
//             onClick={() => this.props.onClick()}>
//          {/* receiving the value from Board. (replaced this.props.value with this.state.value so the square could remember it had been clicked) */}
//           {this.props.value} 
//         </button>
//       );
//     }
// }

// instead of a class with a React.Component, can write a function which takes props as input and returns what should be rendered.
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
// Parent component of Square
// renders the 9 squares
class Board extends React.Component {
    // constructor to contain the state of the game (all the squares in an array)
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    // handle click method
    handleClick(i) {
        // slice creates a copy of the squares array to modify instead of modifying the existing array.
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }

    renderSquare(i) {
        // passes two things to Square; the value and the onClick function
        // instructs each individual square about its current value (X O or null), using the array from the constructor.
        // onClick, calls this handleClick function.
      return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
     />
      ); // parenthesis is so vs code doesn't add a ; after the /> and break the code.
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
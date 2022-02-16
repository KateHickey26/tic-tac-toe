// add draw handling
// add line through the winning go / change colour

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

    // // constructor to contain the state of the game (all the squares in an array)
    // // this was 'lifted up' to the Game level, to allow us to show old moves on the board.
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         // setting first move to be 'X' by default.
    //         // each move, boolean is flipped, and games state is saved.
    //         xIsNext: true,
    //     };
    // }

    // handle click method was moved from here to Game component when the state was levelled up.
    // handleClick(i) {
    //     // slice creates a copy of the squares array to modify instead of modifying the existing array.
    //     const squares = this.state.squares.slice();

    //     // return if someone has won the game or the Square is already filled
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }

    //     // set to either X or O depending on whos go it is (controlled by boolean xIsNext)
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         // handles flipping boolean each move
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    renderSquare(i) {
        // passes two things to Square; the value and the onClick function
        // instructs each individual square about its current value (X O or null), using the array from the constructor.
        // onClick, calls this handleClick function.
      return (
      <Square 
            // replaced the below with the current code. Board component needs to receive 'squares' and 'onClick' props from Game. Since we have the single click handler in Board for many Squares, we need to pass the location of each square into the onClick handler to indicate which square was clicked.
        // value={this.state.squares[i]}
        // onClick={() => this.handleClick(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
     />
      ); // parenthesis is so vs code doesn't add a ; after the /> and break the code.
    }
  
    render() {
        // removed as the Game component is now rendering the game's status.
        // // check for winner
        // const winner = calculateWinner(this.state.squares);
        // // instantiate status variable
        // let status;
        // if (winner) {
        //     // if winner = true
        //     status = 'Winner: ' + winner;
        // } else {
        //     // next player label, using xIsNext boolean
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }
     
  
      return (
        <div>
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

    // set up constructor to hold the game State (so that we can show old moves on the board).
    constructor(props) { 
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],

            // indicates which step in history / current play we are currently viewing.
            stepNumber: 0,

            // controls who's turn it is.
            xIsNext: true,
        };
    }

    // moved from Board class when state levelled up
    handleClick(i) {
        // // using history to set the state
        // const history = this.state.history;
        // replaced this with the below to ensure that if we 'go back in time' and make a new move from that point, we throw away all the 'future' history that would now become incorrect.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);


        const current = history[history.length - 1];
        // slice creates a copy of the squares array to modify instead of modifying the existing array. Allows us to track the moves and use 'time travel' to see old moves, by comparing against old versions of the array, 'history'.
        const squares = current.squares.slice();

        // return if someone won the game or square is already filled.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        // concatenate new entries onto 'history' array.
        // concat doesn't mutate original array, unlike array push() method.
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),

            // after a new move is made, we want to update the stepNumber, especially if we have chosen to view an old move from the 'history' array. This ensures we don't get stuck showing the same move after a new one has been made.
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    // updates the step number, to allow us to view other moves in history array.
    jumpTo(step) {
        // React will only update properties mentioned in the setState method, so we don't need to update 'history' property of the state. The remaining state will be left as it is.
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {

        // will use the most recent history entry to determine and display the games status.
        const history = this.state.history;

        // // always renders the last move:
        // const current = history[history.length -1];
        // changed to the below, to instead render the currently selected move according to the stepNumber.
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);

        // mpa over history and display button to show history on board.
        // 'step' refers to current history element value.
        // 'move' refers to current history element index.
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                // <li> creates list item, containing a button, with onClick handler calling this.jumpTo() method.
                // added the key unique id for the list of moves. (the key is the sequential number of the move. As the moves will never be re-ordered, it's safe to use the move index as a key).
                <li key={move}> 
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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

  // helper function to determine winner.
  // will return 'X', 'O' or null as appropriate.
  // called in Boards render function.
  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [0, 4, 8],
          [2, 4, 6],
          [1, 4, 7],
          [2, 5, 8],
      ];
      for (let i =  0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
          }
      }
      return null;
  }

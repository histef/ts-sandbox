import * as React from 'react';
import './App.css';

// enum to represent each player or no player.
// values assigned are essentially the index #: None = 0, One = 1, Two = 2
const enum Player { None, One, Two }

// the boards type is an array of Player's
interface IState {
  board: Player[];
  nextPlayerTurn: Player;
}

// first type is for props(since we don't receive any, this is an empty object), second is for state
class App extends React.Component<{}, IState> {
  public state = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
    ],
    nextPlayerTurn: Player.One
  }

  // event: React.MouseEvent<HTMLDivElement>
  // index will tell which cell to update
  // not allowed to do anon fn in tslint so need to 
  public createOnClickHandler = (index: number) => () => {
    const { board, nextPlayerTurn } = this.state;

    // check so that once a player has claimed a cell, the other player can't take it
    if (board[index] !== Player.None){
      return
    }
    // create new board for immutability of og board
    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;

    this.setState({
      board: newBoard,
      nextPlayerTurn: 3 - nextPlayerTurn
    })
  }
  
  // in order to prevent createOnClickHandler from executing right away, need to create anon fn (arrow function = lambdas) so that when it's clicked, then fn executes.
  // BUT arrow fn(lambda) 'forbidden in jsx attributes'...so need to move it to createOnClickHandler function by returning an anon function
  public renderCell = (index: number) => {
    const { board } = this.state;

    // data-player gives every cell a player attribute
    return <div className="cell"
      key={Math.random()}
      data-player={board[index]}
      onClick={this.createOnClickHandler(index)}
    />
  }

  // map can take 3 args(current val, index, array), all we need is the 2nd param (index) but it needs to be the in correct order, so we have 1st param (value) even tho we never use it.
  public renderBoard = () => {
    const { board } = this.state;
    return <div className="board-container">
      {board.map((value, index) =>
        this.renderCell(index)
      )}
    </div>
  }

  public render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        {this.renderBoard()}
      </div>
    );
  }
}

export default App;

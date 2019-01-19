import * as React from 'react';
import './App.css';


type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

// enum to represent each player or no player.
// values assigned are essentially the index #: None = 0, One = 1, Two = 2
const enum Player { None, One, Two }

// the boards type is an array of Player's
interface IState {
  board: Player[];
  nextPlayerTurn: Player;
  gameIsWon: Player | ONGOING_GAME;
  winner: Player | undefined;
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
    gameIsWon: ONGOING_GAME,
    nextPlayerTurn: Player.One,
    winner: undefined
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

  // public checkIfWinner = ( board: Player[], nextPlayerTurn: Player ) => {
  //   // after each click check to see if there's a match win pattern 0-2, 3-5, 6-8, 0-3-6, 1-4-7, 2-5-8, 0-4-8, 2-4-6
  //   if(this.state.gameIsGoing){
  //     return <div>{nextPlayerTurn} wins</div>
  //   }
  // }
  
  // in order to prevent createOnClickHandler from executing right away, need to create anon fn (arrow function = lambdas) so that when it's clicked, then fn executes.
  // BUT arrow fn(lambda) 'forbidden in jsx attributes'...so need to move it to createOnClickHandler function by returning an anon function
  public renderCell = (index: number) => {
    const { board } = this.state;

    // data-player gives every cell a player attribute
    return <div className="cell"
      key={Math.random()}
      data-index={index}
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

  public renderStatus = () => {
      return <div style={{marginTop: '50px'}}>Game is going</div>
  }

  public render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        {this.renderBoard()}
        {this.renderStatus()}
      </div>
    );
  }
}

export default App;

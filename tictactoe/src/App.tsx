import * as React from 'react';
import './App.css';


type ONGOING_GAME = -1 | 1;
const ONGOING_GAME = -1;

// enum to represent each player or no player.
// values assigned are essentially the index #: None = 0, One = 1, Two = 2
const enum Player { None, One, Two }

// the boards type is an array of Player's
interface IState {
  board: Player[];
  nextPlayerTurn: Player;
  gameIsWon: Player | ONGOING_GAME;
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
    const { board, nextPlayerTurn, gameIsWon } = this.state;

    // check so that once a player has claimed a cell or won, the other player can't take cell or keep claiming cells
    if (gameIsWon !== ONGOING_GAME || board[index] !== Player.None){
      return
    }
    // create new board that assigns a value of player(0,1, or 2) to each cell
    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;

    const newGameIsWon = this.checkIfGameIsOver(newBoard);

    this.setState({
      board: newBoard,
      gameIsWon: newGameIsWon,
      nextPlayerTurn: 3 - nextPlayerTurn
    })
  }

  public checkIfGameIsOver = (board: Player[]) => {
    // after each click check to see if there's a match win pattern 0-2, 3-5, 6-8, 0-3-6, 1-4-7, 2-5-8, 0-4-8, 2-4-6
    if(board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None){
      return board[0];
    } else if(board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None){
      return board[3];
    } else if(board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None){
      return board[6];
    } else if(board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None){
      return board[0];
    } else if(board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None){
      return board[1];
    } else if(board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None){
      return board[2];
    } else if(board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None){
      return board[0];
    } else if(board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None){
      return board[2];
    }

    for (const player of board) {
      if (player === Player.None){
        return ONGOING_GAME
      }
    }
    // we're returning -1 if there isn't a winner cuz ONGOING_GAME is -1
    return Player.None;
  }
  
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

  public renderStatus = (winner: Player) => {
    const { gameIsWon } = this.state;

    const winnerText = gameIsWon !== Player.None ? `Player ${gameIsWon} won!` : `Draw Game`;
    return <div style={{marginTop: '50px'}}>
      {gameIsWon === ONGOING_GAME ? 'Game is going': winnerText }
      </div>
  }

  public render() {
    const { gameIsWon } = this.state;
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        {this.renderBoard()}
        {this.renderStatus(gameIsWon)}
      </div>
    );
  }
}

export default App;

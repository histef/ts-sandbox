import * as React from 'react';
import './App.css';

// enum to represent each player or no player.
// values assigned are essentially the index #: None = 0, One = 1, Two = 2
const enum Player { None, One, Two }

// the boards type is an array of Player's
interface IState {
  board: Player[]
}

// first type is for props, second is for state
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
          ]
  }

  public renderCell = (index: number) => {
    return <div className="cell" key={Math.random()} />
  }

  public renderBoard = () => {
    const { board } = this.state;
    return <div className="board-container">
    { board.map( (item)=>
      this.renderCell(item)
    )}
    </div>
  }

  public render() {
    return (
      <div className="App">
        <h1>Tac Tac Toe</h1>
        {this.renderBoard()}
      </div>
    );
  }
}

export default App;

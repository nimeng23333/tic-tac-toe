import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./assets/WINNING_COMBINATION";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X:"Player 1",
  O:"Player 2"
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]


function derivePlayerFromTurns(gameTurns){
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoardFromTurns(gameTurns){
  const updateGameBoard = [...INITIAL_GAME_BOARD.map((innerArray)=> [...innerArray])];
  for(const turn of gameTurns){
    updateGameBoard[turn.grid.row][turn.grid.col] = turn.player;
  }
  return updateGameBoard
}

function checkWinner(gameBorad){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSymbol = gameBorad[combination[0].row][combination[0].column];
    const secondSymbol = gameBorad[combination[1].row][combination[1].column];
    const thirdSymbol = gameBorad[combination[2].row][combination[2].column];
    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
      winner = firstSymbol;
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurn] = useState([]);
  const [players,setPlayer] = useState(PLAYERS);
  const currentPlayer = derivePlayerFromTurns(gameTurns);
  const gameBorad = deriveGameBoardFromTurns(gameTurns);
  const winner = checkWinner(gameBorad);
  function gameTurnUpdate(rowIndex,colIndex){
    setGameTurn(prevValue => {
      const currentPlayer = derivePlayerFromTurns(prevValue);
      const updateTurns = [{player:currentPlayer, grid:{row:rowIndex,col:colIndex}},...prevValue];
      return updateTurns;
    });
  }
  function nameChange(event){
    let newName = event.target.value;
    console.log(event.target.value);
    setPlayer(prevValue=>({
      ...prevValue,
      [event.target.name]:newName,
    }));
}
  function reset(){
    setGameTurn([]);
  }
  return (
    <>
    <div id="game-container">
        <ol id="players" className="player highlight-player">
          <Player playerName={players.X} playerSymbol="X" isActive={currentPlayer === "X" } onChange={nameChange} />
          <Player playerName={players.O} playerSymbol="O" isActive={currentPlayer === "O" } onChange={nameChange} />
        </ol>
        {(winner || gameTurns.length==9) && <GameOver winner={players[winner]} onClick={reset}/>}
        <GameBoard gameBoard={gameBorad} onClick={gameTurnUpdate}/>

    </div>
      <Log gameTurns={gameTurns} />
    </>
  )
}

export default App

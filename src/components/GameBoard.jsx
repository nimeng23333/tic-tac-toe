export default function GameBoard({gameBoard,onClick}){
    return(
        <div id="game-board">
            {gameBoard.map((row,rowIndex) => 
                <ol key={row+rowIndex}>
                    {row.map((col,colIndex) => 
                    <button key={col+colIndex} onClick={() => onClick(rowIndex,colIndex)} disabled={col}>{col}</button>)}
                </ol>
            )}    
        </div>
    )
}
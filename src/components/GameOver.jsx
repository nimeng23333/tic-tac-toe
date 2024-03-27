export default function GameOver({winner, onClick}){
    return(
        <div id="game-over">
            <h2>{winner? (winner.toUpperCase() + " wins!"): "It's a draw."} </h2>
            <button onClick={onClick}>Rematch</button>
        </div>
    )
}
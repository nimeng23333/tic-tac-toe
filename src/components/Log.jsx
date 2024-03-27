export default function Log({gameTurns}){
    return(
        <ol id="log">
            {gameTurns.map(
                turn =>        
                <li key={`${turn.grid.row}${turn.grid.col}`}>Player:{turn.player} Row:{turn.grid.row+1} Col:{turn.grid.col+1}</li>
            )}

        </ol>

    )
}
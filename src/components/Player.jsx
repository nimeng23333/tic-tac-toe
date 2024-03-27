import { useState } from "react";

export default function Player({playerName,playerSymbol, isActive, onChange}){
    const [isEditing, setEditing] = useState(false);
    function handleClick(){
        setEditing(!isEditing);
    }
    return(
        <li className={isActive ? 'active' : ""}>
            {isEditing? <input type="text" name={playerSymbol} onChange={onChange} value={playerName}/>:<div className="player-name">{playerName}</div>}
            <div className="player-symbol">{playerSymbol}</div>
            <button onClick={handleClick}>{isEditing? "Save":"Edit"}</button>
        </li>
    )
}
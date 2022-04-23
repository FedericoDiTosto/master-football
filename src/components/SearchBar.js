import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css"

function SearchBar({players, randomPlayer, setSelectedPlayer, selectedPlayer, selectedPlayerList, setSelectedPlayerList, win, setWin,guessed, setGussed}) {
  const [filteredPlayer, setfilteredPlayer] = useState([]);
  const [playerEntered, setplayerEntered] = useState("");
  const [addedPlayer, setAddedPlayer] = useState(false)

  useEffect(() => {
    if(addedPlayer){
      setSelectedPlayerList(currentArray => [...currentArray, selectedPlayer])
      console.log(selectedPlayerList)
      setAddedPlayer(false)
      setGussed(guessed + 1)
      if(randomPlayer.name === selectedPlayer.name){
        setWin(true)
      }
    }
}, [selectedPlayer]);

  const handleFilter = (event) => {
    const searchPlayer = event.target.value;
    setplayerEntered(searchPlayer);
    const newFilter = players.filter((value) => {
      return value.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchPlayer.toLowerCase());
    });

    if (searchPlayer === "") {
      setfilteredPlayer([]);
    } else {
      setfilteredPlayer(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          value={playerEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredPlayer.length !== 0 && (
        <div className="dataResult">
          {filteredPlayer.slice(0, 20).map((value, key) => {
            return (
              <div key={key} className="boxPlayer" onClick={() => {setAddedPlayer(true); setSelectedPlayer(value); setfilteredPlayer([]); setplayerEntered(""); }}>
                <p>{value.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

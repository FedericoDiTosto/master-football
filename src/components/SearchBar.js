import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css"

function SearchBar({players, setSelectedPlayer, selectedPlayer, selectedPlayerList, setSelectedPlayerList, win, setWin}) {
  const [filteredPlayer, setfilteredPlayer] = useState([]);
  const [playerEntered, setplayerEntered] = useState("");

  useEffect(() => {
    if(selectedPlayerList.length >= 0){
    setSelectedPlayerList(currentArray => [...currentArray, selectedPlayer])}
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
              <div key={key} className="boxPlayer" onClick={() => {setSelectedPlayer(value); setfilteredPlayer([]); setplayerEntered(""); }}>
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

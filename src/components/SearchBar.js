import React, { useState } from "react";
import "../styles/SearchBar.css"

function SearchBar({players}) {
  const [filteredPlayer, setfilteredPlayer] = useState([]);
  const [playerEntered, setplayerEntered] = useState("");

  const handleFilter = (event) => {
    const searchPlayer = event.target.value;
    setplayerEntered(searchPlayer);
    const newFilter = players.filter((value) => {
      return value.name.toLowerCase().includes(searchPlayer.toLowerCase());
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
      {filteredPlayer.length != 0 && (
        <div className="dataResult">
          {filteredPlayer.slice(0, 10).map((value, key) => {
            return (
              <div className="selectPlayer" >
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

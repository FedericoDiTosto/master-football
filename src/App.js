import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import More from "./images/more.png";
import Less from "./images/less.png";

function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random() * playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const [selectedPlayerList, setSelectedPlayerList] = useState([])
  const [win, setWin] = useState(false)

  var randomPlayer = playersSerieA[randomPlayerIndex];

  const bkgLess = {
    backgroundImage: `url(${More})`,
  };

  const bkgMore = {
    backgroundImage: `url(${Less})`,
  };

  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}
        selectedPlayerList={selectedPlayerList} setSelectedPlayerList={setSelectedPlayerList} win={win} setWin={setWin} />
      {selectedPlayerList.map((item, key) => (
        <>
          <p className='player-name'>{item.name}</p>
          <div key={key} className="answer-box">
            <div className={randomPlayer.team === item.team ? "answer-team-correct" : "answer-team"}>
              <img src={item.teamLogo} ></img>
            </div>
            <div className={randomPlayer.position === item.position ? "answer-pos-correct" : "answer-pos"}>
              {item.position}
            </div>
            <div className={randomPlayer.age === item.age ? "answer-age-correct" : "answer-age"} style={randomPlayer.age < item.age ? bkgLess : bkgMore}>
              {item.age}
            </div>
          </div>
        </>
      ))}
    </div>

  );
}

export default App;

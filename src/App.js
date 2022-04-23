import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import More from "./images/MoreIcon";
import Less from "./images/LessIcon";
import TShirt from "./images/TShirt.svg";

function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random() * playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const [selectedPlayerList, setSelectedPlayerList] = useState([])
  const [win, setWin] = useState(false)

  var randomPlayer = playersSerieA[randomPlayerIndex];

  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}
        selectedPlayerList={selectedPlayerList} setSelectedPlayerList={setSelectedPlayerList} win={win} setWin={setWin} />
      {selectedPlayerList.map((item, key) => (
        <>
          <p className='player-name'>{item.name}</p>
          <div key={key} className="answer-box">
            <div className={randomPlayer.team === item.team ? "answer-team-correct" : "answer-team"}>
              <img className="tshirt-icon" src={item.teamLogo} ></img>
            </div>
            <div className={randomPlayer.number === item.number ? "answer-num-correct" : "answer-num"}>
                <div className='tshirt-box'>
                {item.number}
                </div>
            </div>
            <div className={randomPlayer.nationality === item.nationality ? "answer-nat-correct" : "answer-nat"}>
            <img src={item.nationalityFlag}></img>
            </div>
            <div className={randomPlayer.position === item.position ? "answer-pos-correct" : "answer-pos"}>
              {item.position}
            </div>
            <div className={randomPlayer.age === item.age ? "answer-age-correct" : "answer-age"} >
              {randomPlayer.age > item.age ? <More /> : randomPlayer.age < item.age ? <Less /> : ""}
              {item.age}
              {randomPlayer.age > item.age ? <More /> : randomPlayer.age < item.age ? <Less /> : ""}
            </div>
          </div>
        </>
      ))}
    </div>

  );
}

export default App;

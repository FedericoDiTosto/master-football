import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import More from "./images/MoreIcon";
import Less from "./images/LessIcon";
import TShirt from "./images/TShirt.svg";
import Shoe from "./images/Shoe"
import ShoeCorrect from './images/ShoeCorrect';
import WinPopUp from './components/WinPopUp';
import LosePopUp from './components/LosePopUp';

function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random() * playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const [selectedPlayerList, setSelectedPlayerList] = useState([])
  const [guessed, setGuessed] = useState(0)
  const [win, setWin] = useState(false)

  var randomPlayer = playersSerieA[randomPlayerIndex];

  function generateRandomPlayer(){
      setRandomPlayerIndex(Math.floor(Math.random() * playersSerieA.length))
      randomPlayer = playersSerieA[randomPlayerIndex]
  }
  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}
        selectedPlayerList={selectedPlayerList} setSelectedPlayerList={setSelectedPlayerList} guessed={guessed} setGuessed={setGuessed} win={win} setWin={setWin} />
        <h4 style={{color: "white"}}>Tentativo {guessed} di 8</h4>
        {randomPlayer.name}
        {!win && guessed >= 8 ? <LosePopUp setWin={setWin} win={win} setGuessed={setGuessed} setSelectedPlayerList={setSelectedPlayerList} generateRandomPlayer={generateRandomPlayer} RandomPlayerName={randomPlayer.name }/>
                  : win ? <WinPopUp setWin={setWin} win={win} setGuessed={setGuessed} setSelectedPlayerList={setSelectedPlayerList} generateRandomPlayer={generateRandomPlayer}/> : ""}
          <div className='info-box'>
            <div className='info-sub-name-box'> 
            <h3>nome</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>squadra</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>numero</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>naz</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>piede</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>pos</h3>
            </div>
            <div className='info-sub-box'> 
            <h3>età</h3>
            </div>
          </div>
          <div className='players-choosen-container'>
      {selectedPlayerList.map((item, key) => (
        <>
          <div key={key} className="answer-box">
            <div className='answer-name'>
            <p className='player-name'>{item.name}</p>
            </div>
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
            <div className={randomPlayer.foot === item.foot ? "answer-foot-correct" : "answer-foot"}>
              {item.foot === "sx" || item.foot === "ex" ? <ShoeCorrect className="leftfoot"/> : <Shoe className="leftfoot"/>} 
              {item.foot === "dx" || item.foot === "ex" ? <ShoeCorrect className="rightfoot"/> : <Shoe className="rightfoot"/>}
            </div>
            <div className={randomPlayer.position === item.position ? "answer-pos-correct" : "answer-pos"}>
              {item.position}
            </div>
            <div className={randomPlayer.age === item.age ? "answer-age-correct" : "answer-age"} >
              <div style={{position: 'relative'}}>
              {randomPlayer.age > item.age ? <More style={{display: 'block', }}/> : randomPlayer.age < item.age ? <Less style={{display: 'block'}}/> : ""}
              {randomPlayer.age > item.age ? <More style={{position: 'absolute',top:7, bottom:0, left:0,}}/> : randomPlayer.age < item.age ? <Less style={{position: 'absolute',top:7, bottom:0, left:0,}}/> : ""}
              </div>
              {item.age}
            </div>
          </div>
        </>
      ))}
      </div>
    </div>

  );
}

export default App;

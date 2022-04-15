import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';


function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random()*playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const [selectedPlayerList, setSelectedPlayerList] = useState([])
  const [win, setWin] = useState(false)
  var randomPlayer = playersSerieA[randomPlayerIndex];

  function calcPlayerAge(birth){
    if(birth != undefined){
      let ageBirth = birth.split("/")
      let day = ageBirth[0]
      let month = ageBirth[1]
      let year = ageBirth[2]
      const ageBirthArr = [year,month,day+"T00:00:00"]
      let ageDate = ageBirthArr.join("-")
      return Math.floor((new Date() - new Date(ageDate).getTime()) / 3.15576e+10)
    }
  }

  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}
                selectedPlayerList={selectedPlayerList} setSelectedPlayerList={setSelectedPlayerList} win={win} setWin={setWin}/>
      {selectedPlayerList.map((item, key) => (
        <>
        <p className='player-name'>{item.name}</p>
        <div key={key} className="answer-box">
          <div className={randomPlayer.team === item.team ? "answer-team-correct" : "answer-team"}>
            {item.team}
          </div>
          <div className={randomPlayer.pos === item.pos ? "answer-pos-correct" : "answer-pos"}>
            {item.pos}
          </div>
          <div className={randomPlayer.birth === item.birth ? "answer-pos-correct" : "answer-pos"}>
            {calcPlayerAge(item.birth)}
          </div>
        </div>
        </>
      ))}
    </div>
    
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';


function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random()*playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  const [selectedPlayerList, setSelectedPlayerList] = useState([])
  var randomPlayer = playersSerieA[randomPlayerIndex];

  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer} 
                  selectedPlayer={selectedPlayer} selectedPlayerList={selectedPlayerList} setSelectedPlayerList={setSelectedPlayerList}/>
      <h4>{randomPlayer.name}</h4>
      {selectedPlayerList.map((item) => (
        <h5>{item.name}</h5>
      ))}
    </div>
  );
}

export default App;

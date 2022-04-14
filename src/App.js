import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';
import { useState } from 'react';


function App() {
  const [randomPlayerIndex, setRandomPlayerIndex] = useState(Math.floor(Math.random()*playersSerieA.length))
  const [selectedPlayer, setSelectedPlayer] = useState({})
  var randomPlayer = playersSerieA[randomPlayerIndex];

  const checkAnswer = () => {
    
  }
  return (
    <div className="App">
      <SearchBar players={playersSerieA} randomPlayer={randomPlayer} setSelectedPlayer={setSelectedPlayer}/>
      {/* <button onClick={() => setRandomPlayerIndex(Math.floor(Math.random()*playersSerieA.length))}>start</button> */}
      <h4>{randomPlayer.name}</h4>
      <h5>{selectedPlayer.name}</h5>
    </div>
  );
}

export default App;

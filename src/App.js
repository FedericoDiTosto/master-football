import logo from './logo.svg';
import './App.css';
import playersSerieA from './data&scraping/serieA.json'
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <SearchBar players={playersSerieA}/>
    </div>
  );
}

export default App;

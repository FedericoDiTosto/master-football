import logo from './logo.svg';
import './App.css';
import serieA from './data&scraping/serieA.json'

function App() {
  return (
    <div className="App">
      {serieA[20].name}
    </div>
  );
}

export default App;

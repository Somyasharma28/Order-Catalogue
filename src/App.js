import './App.css';
import data from './Components/data/data.json';
import CatalogueScreen from './Components/CatalogueScreen';



function App() {

  return (
    <div className="App">
      <CatalogueScreen  data={data} />
    </div>
  );
}

export default App;

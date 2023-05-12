import { EthProvider } from "./contexts/EthContext";
import ItemsDashboard from "./components/ItemsDashboard";
import ItemPage from "./components/ItemPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="col">
          
          <ItemPage />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

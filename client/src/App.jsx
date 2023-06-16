import { EthProvider } from "./contexts/EthContext";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {

  return (
    <EthProvider>
        <div id="App">
          <div className="col">
            <Navbar />
            <Main />
          </div>
        </div>
    </EthProvider>
  );
}

export default App;

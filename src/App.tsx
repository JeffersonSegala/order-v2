import './App.css'
import Header from './Components/Header';
import OnlineMembers from './Components/OnlineMembers/OnlineMembers'
import WatchList from './Components/WatchList/WatchList';

function App() {
  return (
    <div className="App">
      
      <Header />
      
      <div className='windowsContainer'>
        <div>
          <OnlineMembers />
        </div>
        <div>
          <WatchList />
        </div>
      </div>
      
    </div>
  )
}

export default App
